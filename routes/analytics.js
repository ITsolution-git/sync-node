var express = require('express');
var router = express.Router();
var session = require('express-session');
var Project = require('../models/project');
var User = require('../models/user');
var mongoose = require('mongoose');


router.get('/index', function(req, res, next) {
	res.render('pages-analytics', { 
				title: 'Community Analytics', 
				user: req.session.user });
});

module.exports = router;