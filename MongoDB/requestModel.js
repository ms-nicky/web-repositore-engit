const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  total: { type: Number, default: 0 }
});

module.exports = mongoose.model('RequestCounter', requestSchema);
