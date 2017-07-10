var express = require('express');
var router = express.Router();
var User = require('../models/user');


/* GET home page. */
router.get('/', function(req, res, next) {
	User.count({}, function(err, count){
		if(err) {
			console.log(err)
		}else {
			res.render('index', { 
				title: 'Express', 
				user: req.session.user,
				count: count });
		}
	})

});

module.exports = router;