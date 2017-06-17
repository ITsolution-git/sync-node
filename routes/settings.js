var express = require('express');
var router = express.Router();
var session = require('express-session');

router.get('/profile', function(req, res, next) {
	res.render('pages-profile', { title: 'Settings Profile' });
});
module.exports = router;