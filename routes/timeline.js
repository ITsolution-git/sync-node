var express = require('express');
var router = express.Router();
var session = require('express-session');
var Project = require('../models/project');
var User = require('../models/user');
var mongoose = require('mongoose');


router.get('/index', function(req, res, next) {
	Project.find({private: {$ne: true}},null, {sort: {created_at: -1}})
		.populate('author_id')
		.exec(function(err, projects) {
			console.log(projects)
			res.render('pages-timeline', { 
				title: 'Timeline', 
				projects: projects,
				user: req.session.user });
		})
});

module.exports = router;