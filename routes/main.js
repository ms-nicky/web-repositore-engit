__path = process.cwd()

var express = require('express');
var router = express.Router();
const { User } = require('../MongoDB/schema');

router.get('/', async (req, res) => {
	if (!req.user) return res.redirect('/users/login');
	const user = await User.findOne({ username: req.user.username });
	res.render('index', {
		user: user,
		username: user.username,
		apikey: user.apikey,
		limit: user.limit
	});
});

module.exports = router
