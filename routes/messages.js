var express = require('express');
var router = express.Router();
var session = require('express-session');

router.get('/index', function(req, res, next) {
	res.render('pages-messages', { title: 'Messages Lists', user: req.session.user });
});

// router.get('/notification', function(req, res, next) {
// 	res.render('messages/notification', { title: 'Messages Notification' });
// });

module.exports = router;