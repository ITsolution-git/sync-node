var express = require('express');
var router = express.Router();
var path = require('path');
var session = require('express-session');
var Project = require('../models/project');
var mongoose = require('mongoose');

router.get('/index', function(req, res, next) {
	var sess = req.session,
		query = req.query,
		per_page = req.query.per_page,
		page = req.query.page;

	if(per_page == undefined || per_page == '' || per_page == 0) {
		per_page = 5;
		page = 0;
	}
	per_page = parseInt(per_page);
	page = parseInt(page);

	Project.count({author_id: sess.user._id} ,function(err, count){
		if(err){
			console.log(err);
		}

		Project.find({author_id: sess.user._id}, null , { skip: per_page * page, limit: per_page, sort: {private: -1}}, function(err, projects){
			if(err) console.log(err)
			categories = []
			projects.forEach(function(project){
				categories = categories.concat(project.category)
			});

			category_list = categories.reduce(function(a, b) {
			    return Object.assign(a, {[b]: (a[b] || 0) + 1})
			}, {});


			res.render('pages-blog-list', { 
					title: 'Projects list', 
					projects: projects, 
					count: Math.ceil(count/per_page), 
					page: page, 
					per_page: per_page,
					category: category_list, 
					user: req.session.user });
		})
	})
});

router.post('/ajax_get', function(req, res, next) {
	var body = req.body,
		per_page = 5;

	page = body.page;
	id = body['user[_id]']

	if(page == undefined || page == '' || page == 0) {
		page = 0;
	}

	per_page = parseInt(per_page);
	page = parseInt(page);

	Project.count({author_id: id}, function(err, count){
		Project.find({author_id: id}, {} , { skip: per_page * page, limit: per_page, sort: {private: -1}}, function(err, projects){
			categories = []
			projects.forEach(function(project){
				categories = categories.concat(project.category);
			});

			category_list = categories.reduce(function(a, b) {
			    return Object.assign(a, {[b]: (a[b] || 0) + 1})
			}, {});

			console.log(projects)

			res.render('pages-project-list', { 
					title: 'Projects list', 
					projects: projects, 
					count: Math.ceil(count/per_page), 
					page: page, 
					per_page: per_page,
					category: category_list, 
					user: {} });
		})
	})
});

router.get('/create', function(req, res, next) {
	res.render('form-layouts-one-column', { 
		title: 'Projects category', 
		status: '', 
		message: '',
		user: req.session.user });
});

router.post('/create', function(req, res, next) {
	var body = req.body;
	var sess = req.session;

	console.log(body)
	console.log(sess)

	if (req.files) {
		console.log(req.files)
		let sampleFile = req.files.image,
			filename = (new Date % 9e6).toString(36);

		if(sampleFile != undefined) {
			filename = (filename + sampleFile.name).replace(/\s+/g, '_');
			
			var link = '/images/upload/' + filename,
	    		filePath = path.join(__dirname, '../public/', link);
			// Use the mv() method to place the file somewhere on your server 
			sampleFile.mv(filePath, function(err) {
			   	if (err)
			     	return res.status(500).send(err);

			    var private = body.private == 'true' ? true : false;
			    var project = new Project({
			    	title: body.title,
			    	content: body.content,
			    	category: body.category.split(','),
			    	image_link: link,
			    	like: 0,
			    	follow: 0,
			    	view: 0,
			    	author_id: sess.user_id,
			    	private: private
			    })

			    project.save(function(err){
			    	if(err) return res.status(500).send(err);

					res.render('form-layouts-one-column', { 
						title: 'Projects category', 
						status: 'status', 
						message: 'You created the project successfully',
						user: req.session.user });
			    })
			});			
		} else {
			res.render('form-layouts-one-column', { 
				title: 'Projects category', 
				status: 'status', 
				message:'You should upload image',
				user: req.session.user });
		}
	}

});

module.exports = router;