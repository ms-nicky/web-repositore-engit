__path = process.cwd()
require("./settings");

const express       = require('express'),
      cors          = require('cors'),
      flash         = require('connect-flash'),
      rateLimit     = require("express-rate-limit"),
      passport      = require('passport'),
      expressLayout = require('express-ejs-layouts'),
      compression   = require('compression'),
      session       = require('express-session'),
      cookieParser  = require('cookie-parser'),
      MemoryStore   = require('memorystore')(session),
      secure        = require('ssl-express-www'),
      schedule      = require('node-schedule'),
      fs            = require('fs'),
      path          = require('path'),
      multer        = require('multer');
      axios = require('axios');
      FormData = require('form-data');
const PORT = process.env.PORT || 44556 || 5000 || 4000;
const app  = express();

const { color } = require('./lib/color.js');

const { isAuthenticated } = require('./lib/auth');
const { connectMongoDb }  = require('./MongoDB/mongodb');
const { useLimit } = require('./MongoDB/function');
const { resetAllLimit, cekKey, limitAdd, getApikey } = require('./MongoDB/function');
const { countRequest }    = require('./lib/middleware');

const apirouter  = require('./routes/api'),
      mainrouter = require('./routes/main'),
      userrouter = require('./routes/users');
const profilerouter = require('./routes/profile');

connectMongoDb();
app.set('trust proxy', 1);
app.use(compression());

// === Rate Limit ===
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 2000,
  message: 'Oops too many requests'
});
app.use(limiter);

app.set('view engine', 'ejs');
app.use(expressLayout);
app.use(express.static("assets"));

app.enable('trust proxy');
app.set("json spaces", 2);
app.use(cors());
app.use(secure);

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 86400000 },
  store: new MemoryStore({ checkPeriod: 86400000 })
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());
// Middleware to persist background mode in session (must be after session/cookieParser)
app.use((req, res, next) => {
  if (req.query.bgmode) {
    req.session.bgmode = req.query.bgmode;
  }
  res.locals.bgmode = req.session.bgmode || 'default';
  next();
});
require('./lib/config')(passport);

app.use(flash());
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg   = req.flash('error_msg');
  res.locals.error       = req.flash('error');
  res.locals.user        = req.user || null;
  next();
});

// ======= ROUTES VIEW =======
app.get('/', (req, res) => {
  res.render('home', { layout: 'home', bgmode: res.locals.bgmode });
});

app.get('/docs', isAuthenticated, async(req, res) => {
  // ambil key user login
  const getkey = await getApikey(req.user.id);
  const { apikey, username, limit, accountType } = getkey;
  res.render('index', { apikey, username, limit, accountType, layout: 'index', bgmode: res.locals.bgmode });
});

app.get('/shop', (req, res) => {
  res.render('shoplist', { layout: 'shoplist', bgmode: res.locals.bgmode });
});

// Dynamic pages
const pages = [
  'cecan','downloader','news','photooxy','search','nsfw',
  'random','anime','stiker','islam','game','other'
];

pages.forEach(page => {
  app.get(`/${page}`, isAuthenticated, async (req,res) => {
    const getkey = await getApikey(req.user.id);
    const { apikey, username } = getkey;
    res.render(page, { apikey, layout: page, bgmode: res.locals.bgmode });
  });
});

// ======= SETUP MULTER =======
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// fungsi random 6–7 karakter (huruf & angka)
function randomName(len = 7) {
  return Math.random().toString(36).substring(2, 2 + len);
}

/*const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, randomName(7) + ext);
  }
});


const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  const allowed = ['.png','.jpg','.jpeg','.mp4'];
  allowed.includes(ext) ? cb(null, true) : cb(new Error('Only png, jpg, mp4 allowed'));
};

const upload = multer({ storage, fileFilter });*/
// ======= SETUP MULTER =======
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, randomName(7) + ext);
  }
});

// filter + limit ukuran
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const allowed = ['.png','.jpg','.jpeg','.mp4'];
    allowed.includes(ext) ? cb(null,true) : cb(new Error('Only png, jpg, mp4 allowed'));
  },
  limits: { fileSize: 500 * 1024 * 1024 } // max 500MB
});



// ======= HALAMAN HTML UPLOAD =======
app.get('/upload-form', isAuthenticated, async(req,res)=>{
  const getkey = await getApikey(req.user.id);
  const { apikey } = getkey;
  res.render('upload', { apikey, layout: false });
});

// ======= API UPLOAD =======
const PHP_INTERNAL_APIKEY = process.env.PHP_APIKEY || "Ms-NICKY-01";
app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const userApiKey = req.query.apikey || req.body.apikey;
    if (!userApiKey) {
      return res.status(400).json({ status:false, message:'apikey required' });
    }

    // 🔹 pakai useLimit (otomatis cek & kurangi limit)
    const keyInfo = await useLimit(userApiKey);
    if (!keyInfo) {
      return res.status(403).json({
        status:false,
        message:'Limit exceeded, tidak bisa upload lagi',
        limit_left: 0
      });
    }

    // Cek file
    if (!req.file) {
      return res.status(400).json({ status:false, message:'No file uploaded' });
    }

    // 🔹 lanjut upload ke PHP
    const form = new FormData();
    form.append("file", fs.createReadStream(req.file.path));
    form.append("apikey", PHP_INTERNAL_APIKEY);

    let phpRes;
    try {
      phpRes = await axios.post("https://nickystore.biz.id/upload.php", form, {
        headers: form.getHeaders(),
        maxContentLength: Infinity,
        maxBodyLength: Infinity
      });
    } catch (phpErr) {
      // Hapus file lokal jika gagal upload ke PHP
      if (req.file && req.file.path && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(502).json({ status:false, message:'Upload to PHP server failed', detail: phpErr.message });
    }

    // Hapus file lokal setelah upload
    if (req.file && req.file.path && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    const fileUrl = phpRes.data.url || phpRes.data.file_url;

    return res.json({
      status: true,
      message: "Upload success",
      file_url: fileUrl,
      limit_left: keyInfo.limit  // sudah otomatis berkurang
    });

  } catch (err) {
    console.error("Upload error:", err.message);
    return res.status(500).json({ status:false, message: err.message });
  }
});
// static folder agar file bisa diakses publik
app.use('/uploads', express.static(uploadDir));

// router api lain tetap
app.use('/profile', profilerouter);
app.use('/api', countRequest, apirouter);
app.use('/users', userrouter);

app.use(function (req, res) {
  res.status(404).json({ status: false, message: "Page not found" });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(color("Server running on port " + PORT, 'green'));
  schedule.scheduleJob('0 0 * * *', () => {
    resetAllLimit();
  });
});

module.exports = app;
