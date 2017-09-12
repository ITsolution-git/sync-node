var express = require('express');
var router = express.Router();
var session = require('express-session');
var Project = require('../models/project');
var User = require('../models/user');
var Travel = require('../models/travel');
var mongoose = require('mongoose');


router.get('/index', function(req, res, next) {
	Travel.find({user_id: req.session.user._id}, null, {sort: {'date': -1}}, function(err, travels){
		var green_travel = 0 , yellow_travel = 0, red_travel = 0;
		travels.forEach(function(t){
			if(t.category == 'green') {
				green_travel += 1;
				travels.push(t)
			}
			if (t.location == 'San Francisco' || t.location == 'New York' || t.location == 'San Diego' || t.location == "San Jose" || t.location == 'Los Angeles' ){
				t.country = 'United States'
				t.continent = 'North America'
				t.save()
			}
			if (t.location == 'Bangalore' ) {
				t.country = 'India'
				t.continent = 'Asia'
				t.save()
			}

			if (t.location == 'Sao Paulo') {
				t.country = 'Brazil'
				t.continent = 'South America'
				t.save()
			}


			if(t.category == 'yellow') yellow_travel += 1;
			if(t.category == 'red') red_travel += 1;			
		})

		var green_travel_per = Math.ceil(green_travel / 5)
		var yellow_travel_per = Math.ceil(yellow_travel / 5)
		var red_travel_per = Math.ceil(red_travel / 5)


		res.render('pages-travels', { 
				title: 'Timeline', 
				travels: travels,
				user: req.session.user,
				green_travel: green_travel,
				yellow_travel: yellow_travel,
				red_travel: red_travel,
				green_travel_per: green_travel_per,
				yellow_travel_per: yellow_travel_per,
				red_travel_per: red_travel_per });
	});	
});

module.exports = router;