
const express = require('express');
const validator = require('validator');
const router = express.Router();
const { isAuthenticated } = require('../lib/auth');
const { User } = require('../MongoDB/schema');
const bcrypt = require('bcryptjs');
const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');

// POST custom apikey (khusus premium)
router.post('/custom-apikey', isAuthenticated, async (req, res) => {
  let { customApikey } = req.body;
  // Sanitasi input untuk mencegah XSS dan karakter berbahaya
  if (typeof customApikey === 'string') {
    customApikey = validator.escape(customApikey.trim());
  }
  // Owner boleh apapun, premium tetap validasi panjang
  const user = await User.findOne({ username: req.user.username });
  if (!user) {
    req.flash('error_msg', 'User tidak ditemukan');
    return res.redirect('/profile');
  }
  if (user.role !== 'owner' && (!customApikey || typeof customApikey !== 'string' || customApikey.length < 4 || customApikey.length > 32)) {
    req.flash('error_msg', 'Custom apikey harus 4-32 karakter');
    return res.redirect('/profile');
  }
  // Cek apakah apikey sudah dipakai user lain (kecuali owner ganti apikey sendiri)
  const exist = await User.findOne({ apikey: customApikey });
  if (exist && exist.username !== user.username) {
    req.flash('error_msg', 'Apikey sudah digunakan user lain');
    return res.redirect('/profile');
  }
  // Cek role user
  if (user.role !== 'premium' && user.role !== 'owner') {
    req.flash('error_msg', 'Hanya user premium atau owner yang bisa custom apikey');
    return res.redirect('/profile');
  }
  // Update apikey
  await User.updateOne({ username: req.user.username }, { apikey: customApikey });
  req.flash('success_msg', 'Custom apikey berhasil diubah!');
  res.redirect('/profile');
});

// GET profile page
router.get('/', isAuthenticated, async (req, res) => {
  const user = await User.findOne({ username: req.user.username });
  if (!user) return res.redirect('/users/login');

  // Cek role owner
  let accountType = user.role === 'owner' ? 'Owner' : (user.role === 'premium' ? 'Premium' : 'Free');
  let limit = user.role === 'owner' ? '∞' : user.limit;
  let expiredAt = 'No expiration';
  if (user.role === 'owner') {
    expiredAt = '∞';
  } else if (user.role === 'premium' && user.premium && user.premium.length > 0) {
    expiredAt = user.premium[0].expired || 'No expiration';
  }

  res.render('profile', {
    user: {
      username: user.username,
      email: user.email,
      apikey: user.apikey,
      accountType,
      role: user.role, // <-- tambahkan role
      limit,
      expiredAt,
      profilePic: user.profilePic || '/uploads/pp-default.png',
    }
  });
});

// POST upload profile picture
router.post('/upload-photo', isAuthenticated, async (req, res) => {
  if (!req.files || !req.files.profilePic) {
    req.flash('error_msg', 'No file uploaded');
    return res.redirect('/profile');
  }
  const file = req.files.profilePic;
  if (!file.mimetype.startsWith('image/')) {
    req.flash('error_msg', 'File harus berupa gambar');
    return res.redirect('/profile');
  }
  // Simpan file ke tmp
  const tmpPath = './tmp/' + file.name;
  await file.mv(tmpPath);
  // Upload ke PHP
  try {
    const form = new FormData();
    form.append('file', fs.createReadStream(tmpPath));
    form.append('apikey', 'Ms-NICKY-01');
    const response = await axios.post('https://nickystore.biz.id/upload.php', form, {
      headers: form.getHeaders()
    });
    const url = response.data.url;
    if (url) {
      await User.updateOne({ username: req.user.username }, { profilePic: url });
      fs.unlinkSync(tmpPath);
      req.flash('success_msg', 'Foto profil berhasil diupload');
    } else {
      req.flash('error_msg', 'Gagal upload foto');
    }
  } catch (err) {
    req.flash('error_msg', 'Gagal upload foto');
  }
  res.redirect('/profile');
});

// POST change password
router.post('/change-password', isAuthenticated, async (req, res) => {
  const { oldPassword, newPassword, confirmNewPassword } = req.body;
  if (!oldPassword || !newPassword || !confirmNewPassword) {
    req.flash('error_msg', 'Semua field wajib diisi');
    return res.redirect('/profile');
  }
  if (newPassword !== confirmNewPassword) {
    req.flash('error_msg', 'Password baru dan konfirmasi tidak sama');
    return res.redirect('/profile');
  }
  const user = await User.findOne({ username: req.user.username });
  if (!user) {
    req.flash('error_msg', 'User tidak ditemukan');
    return res.redirect('/profile');
  }
  const match = await bcrypt.compare(oldPassword, user.password);
  if (!match) {
    req.flash('error_msg', 'Password lama salah');
    return res.redirect('/profile');
  }
  const hash = await bcrypt.hash(newPassword, 10);
  await User.updateOne({ username: req.user.username }, { password: hash });
  req.flash('success_msg', 'Password berhasil diubah');
  res.redirect('/profile');
});

// POST change email
router.post('/change-email', isAuthenticated, async (req, res) => {
  const { oldEmail, newEmail } = req.body;
  if (!oldEmail || !newEmail) {
    req.flash('error_msg', 'Semua field wajib diisi');
    return res.redirect('/profile');
  }
  const user = await User.findOne({ username: req.user.username });
  if (!user) {
    req.flash('error_msg', 'User tidak ditemukan');
    return res.redirect('/profile');
  }
  if (user.email !== oldEmail) {
    req.flash('error_msg', 'Email lama salah');
    return res.redirect('/profile');
  }
  await User.updateOne({ username: req.user.username }, { email: newEmail });
  req.flash('success_msg', 'Email berhasil diubah');
  res.redirect('/profile');
});

module.exports = router;
