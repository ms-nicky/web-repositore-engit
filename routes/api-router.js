const express = require('express');
const multer = require('multer');
const path = require('path');
const { blockIPOnUploadError } = require('../lib/ip-blocker');

const router = express.Router();

// Konfigurasi Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

// Filter jenis file yang diizinkan
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|mp4/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb(new Error('Jenis file tidak diizinkan.'), false);
    }
};

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 50 }, // Batasan ukuran 50MB
    fileFilter: fileFilter
}).single('media'); // 'media' adalah nama field di formulir

// Endpoint POST untuk unggah pos dan file
router.post('/upload', (req, res) => {
    // Menggunakan middleware Multer dan penanganan kesalahan IP
    upload(req, res, (err) => {
        // Panggil middleware penanganan error dari ip-blocker
        blockIPOnUploadError(err, req, res, () => {
            if (req.file) {
                console.log('File berhasil diunggah:', req.file.filename);
                return res.status(200).json({ 
                    message: 'File berhasil diunggah', 
                    filePath: req.file.path,
                    postData: req.body // Anda bisa mengakses data pos lain di sini
                });
            } else {
                return res.status(400).send('Tidak ada file yang diunggah.');
            }
        });
    });
});

module.exports = router;
