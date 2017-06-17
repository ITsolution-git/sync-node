var express = require('express');
var router = express.Router();
var session = require('express-session');

router.get('/index', function(req, res, next) {
	res.render('pages-blog-list', { title: 'Projects list' });
});

router.get('/create', function(req, res, next) {
	res.render('form-layouts-one-column', { title: 'Projects category' });
});
/*
router.get('/manage', function(req, res, next) {
	res.render('projects/manage', { title: 'Projects Manage' });
});

router.get('/recent', function(req, res, next) {
	res.render('projects/recent', { title: 'Projects Recent' });
});*/
module.exports = router;