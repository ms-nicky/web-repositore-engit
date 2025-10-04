const RequestCounter = require('../MongoDB/requestModel');

async function countRequest(req, res, next) {
  try {
    // 🚫 Jangan hitung request ke /api/stats
    if (req.path !== '/stats') {
      let counter = await RequestCounter.findOne();
      if (!counter) counter = await RequestCounter.create({ total: 0 });
      counter.total += 1;
      await counter.save();
    }
  } catch (e) {
    console.error('Error countRequest:', e.message);
  }
  next();
}

module.exports = { countRequest };
