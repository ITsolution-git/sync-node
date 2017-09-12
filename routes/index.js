var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Authtime = require('../models/authtime');
var Time = require('../models/time');
var Travel = require('../models/travel');
var Project = require('../models/project');
var Comment = require('../models/comment');
var Message = require('../models/message');
var Game = require('../models/game');

/* GET home page. */
router.get('/', function(req, res, next) {
	Travel.find({user_id: req.session.user._id}, function(err, travels){
		if(travels.length == 0) {
			var travel1 = new Travel({
				user_id: req.session.user._id,
				description: 'this is my travel',
				url:'https://challenges.openideo.com',
				location:'San Francisco',
				category:'green',
				country: 'United States',
				continent: 'North America',
				latlng:[37.78,  -122.41],
				date:new Date('2016-03-03')
			});

			var travel2 = new Travel({
				user_id: req.session.user._id,
				description: 'this is my travel',
				url:'https://challenges.openideo.com',
				location:'New York',
				country: 'United States',
				continent: 'North America',
				category:'yellow',
				latlng: [40.71, -74.00],
				date:new Date('2016-04-03')
			});

			var travel3 = new Travel({
				user_id: req.session.user._id,
				description: 'this is my travel',
				url:'https://www.weforum.org',
				location:'Bangalore',
				latlng: [12.97, 77.59],
				country: 'India',
				continent: 'Asia',
				category:'red',
				date:new Date('2016-05-03')
			});

			var travel4 = new Travel({
				user_id: req.session.user._id,
				description: 'this is my travel',
				url:'https://challenges.openideo.com',
				location:'San Diego',
				country: 'United States',
				continent: 'North America',
				latlng:[32.71, -117.16],
				category:'green',
				date:new Date('2016-06-03')
			});

			var travel11 = new Travel({
				user_id: req.session.user._id,
				description: 'this is my travel',
				url:'https://challenges.openideo.com',
				location:'San Francisco',
				country: 'United States',
				continent: 'North America',
				latlng:[37.78,  -122.41],
				category:'green',
				date:new Date('2016-03-03')
			});

			var travel21 = new Travel({
				user_id: req.session.user._id,
				description: 'this is my travel',
				url:'https://challenges.openideo.com',
				location:'New York',
				country: 'United States',
				continent: 'North America',
				latlng: [40.71, -74.00],
				category:'yellow',
				date:new Date('2016-04-03')
			});

			var travel31 = new Travel({
				user_id: req.session.user._id,
				description: 'this is my travel',
				url:'https://www.weforum.org',
				location:'Bangalore',
				country: 'India',
				continent: 'Asia',
				latlng: [12.97, 77.59],
				category:'red',
				date:new Date('2016-05-03')
			});

			var travel41 = new Travel({
				user_id: req.session.user._id,
				description: 'this is my travel',
				url:'https://challenges.openideo.com',
				location:'San Diego',
				country: 'United States',
				continent: 'North America',
				latlng:[32.71, -117.16],
				category:'green',
				date:new Date('2016-06-03')
			});

			var travel12 = new Travel({
				user_id: req.session.user._id,
				description: 'this is my travel',
				url:'https://challenges.openideo.com',
				location:'San Francisco',
				country: 'United States',
				continent: 'North America',
				latlng:[37.78,  -122.41],
				category:'green',
				date:new Date('2016-03-03')
			});

			var travel22 = new Travel({
				user_id: req.session.user._id,
				description: 'this is my travel',
				url:'https://challenges.openideo.com',
				location:'New York',
				country: 'United States',
				continent: 'North America',
				latlng: [40.71, -74.00],
				category:'yellow',
				date:new Date('2016-04-04')
			});

			var travel32 = new Travel({
				user_id: req.session.user._id,
				description: 'this is my travel',
				url:'https://www.weforum.org',
				location:'Bangalore',
				country: 'India',
				continent: 'Asia',
				latlng: [12.97, 77.59],
				category:'red',
				date:new Date('2016-05-21')
			});

			var travel42 = new Travel({
				user_id: req.session.user._id,
				description: 'this is my travel',
				url:'https://challenges.openideo.com',
				location:'Sao Paulo',
				country: 'Brazil',
				continent: 'South America',
				latlng:[-23.55, -46.63],
				category:'green',
				date:new Date('2016-06-12')
			});

			var travel13 = new Travel({
				user_id: req.session.user._id,
				description: 'this is my travel',
				url:'https://challenges.openideo.com',
				location:'San Jose',
				country: 'United States',
				continent: 'North America',
				latlng:[37.33, -121.88],
				category:'green',
				date:new Date('2016-03-23')
			});

			var travel23 = new Travel({
				user_id: req.session.user._id,
				description: 'this is my travel',
				url:'https://challenges.openideo.com',
				location:'New York',
				country: 'United States',
				continent: 'North America',
				latlng: [40.71, -74.00],
				category:'yellow',
				date:new Date('2016-04-13')
			});

			var travel33 = new Travel({
				user_id: req.session.user._id,
				description: 'this is my travel',
				url:'https://www.weforum.org',
				location:'Bangalore',
				country: 'India',
				continent: 'Asia',
				latlng: [12.97, 77.59],
				category:'red',
				date:new Date('2016-05-06')
			});

			var travel43 = new Travel({
				user_id: req.session.user._id,
				description: 'this is my travel',
				url:'https://challenges.openideo.com',
				location:'Los Angeles',
				country: 'United States',
				continent: 'North America',
				latlng: [34.05, -118.24],
				category:'green',
				date:new Date('2016-06-04')
			});

			travel1.save(function(err){});
			travel2.save(function(err){});
			travel3.save(function(err){});
			travel4.save(function(err){});
			travel11.save(function(err){});
			travel21.save(function(err){});
			travel31.save(function(err){});
			travel41.save(function(err){});
			travel12.save(function(err){});
			travel22.save(function(err){});
			travel32.save(function(err){});
			travel42.save(function(err){});
			travel13.save(function(err){})
			travel23.save(function(err){})
			travel33.save(function(err){})
			travel43.save(function(err){})
			
		}
	});

	User.count({}, function(err, count){
		if(err) {
			console.log(err)
		}else {
			Authtime.find({}, function(err, auth_ts){
				Time.find({}, function(err, times){
					//user's time
					user = req.session.user;
					cur_user = {
						auth_count: 0,
						total_session:0,
						session: 0,
						game_count:0,
						total_game:0,
						game: 0,
						timeline_count:0,
						total_timeline:0,
						timeline: 0,
						profile_count:0,
						total_profile:0,
						profile:0,
						project_count:0,
						total_project:0,
						project:0,
						travel:0,
						travel_green:[{}],
						travels:[],
						total_travel:0,
						green_travel: 0,
						yellow_travel: 0,
						red_travel: 0,
						green_travel_per: 0,
						yellow_travel_per: 0,
						red_travel_per: 0,
						point: 0,
						total_session_donut:0,
						total_travel_green:0,
						total_project_donut: 0,
						total_comment_donut: 0,
						total_message_donut: 0,
						total_game_donut:0,
						total_auth_donut: 0
					}

					community = {
						auth_count: 0,
						total_session:0,
						session: 0,
						game_count:0,
						total_game:0,
						game: 0,
						timeline_count:0,
						total_timeline:0,
						timeline: 0,
						profile_count:0,
						total_profile:0,
						profile:0,
						project_count:0,
						total_project:0,
						project:0,
						travel:0,
						travel_green:[{}],
						total_travel_green:0,
						total_project: 0,
						total_comment: 0,
						total_message: 0,
						total_game: 0,
						total_points:0,
						total_session_bar: 0
					}

					if(auth_ts.length == 0) {

					}

					auth_ts.forEach(function(t){
						if(t.user_id == user._id){
							cur_user.total_session += isNaN(t.session) ? 0 : t.session;
							cur_user.auth_count += 1;
						}

						community.total_session += isNaN(t.session) ? 0 : t.session;
						community.auth_count += 1;
					})

					cur_user.total_auth_donut = auth_ts.length;

					cur_user.session = Math.ceil(cur_user.total_session / cur_user.auth_count / 3600);
					community.session = Math.ceil(community.total_session / community.auth_count / 3600);

					times.forEach(function(t){
						if(t.user_id == user._id){
							if(t.page == 'games') {
								cur_user.total_game += t.session;
								cur_user.game_count += 1;
							}
							if(t.page == 'projects') {
								cur_user.total_project += t.session;
								cur_user.project_count += 1;
							}
							if(t.page == 'settings') {
								cur_user.total_profile += t.session;
								cur_user.profile_count += 1;
							}
							if(t.page == 'timeline') {
								cur_user.total_timeline += t.session;
								cur_user.timeline_count += 1;
							}
						}
						if(t.page == 'games') {
							community.total_game += t.session;
							community.game_count += 1;
						}
						if(t.page == 'projects') {
							community.total_project += t.session;
							community.project_count += 1;
						}
						if(t.page == 'settings') {
							community.total_profile += t.session;
							community.profile_count += 1;
						}
						if(t.page == 'timeline') {
							community.total_timeline += t.session;
							community.timeline_count += 1;
						}
					});

					cur_user.game = Math.ceil(cur_user.total_game / cur_user.game_count / 3600);
					cur_user.profile = Math.ceil(cur_user.total_profile / cur_user.profile_count / 3600);
					cur_user.project = Math.ceil(cur_user.total_project / cur_user.project_count / 3600);
					cur_user.timeline = Math.ceil(cur_user.total_timeline / cur_user.timeline_count / 3600);

					community.game = Math.ceil(community.total_game / community.game_count / 3600);
					community.profile = Math.ceil(community.total_profile / community.profile_count / 3600);
					community.project = Math.ceil(community.total_project / community.project_count / 3600);
					community.timeline = Math.ceil(community.total_timeline / community.timeline_count / 3600);

					Travel.find({}, null, {sort: {'date': -1}}, function(err, travels){
						for(let i = 0; i < travels.length; i++){
							let t = travels[i];

							if(t.user_id == req.session.user._id){
								if(t.category == 'green') {
									cur_user.green_travel += 1;
									cur_user.travels.push(t)
								}
								if(t.category == 'yellow') cur_user.yellow_travel += 1;
								if(t.category == 'red') cur_user.red_travel += 1;
							}

							if(t.category == 'green'){
								let date = (new Date(t.date)).toISOString().substring(0, 10);

								if(t.user_id == req.session.user._id){

									cur_user.point += 5;

									let cid = getGreenStatus(cur_user.travel_green, date);

									if( cid != 0){
										cur_user.travel_green[cid].value += 1;
									}else{
										cur_user.travel_green.push({
											value: 1,
											date: date
										});
									}	
								}
								
								var id = getGreenStatus(community.travel_green, date)
								if( id != 0){
									community.travel_green[id].value += 1;
								}else{
									community.travel_green.push({
										value: 1,
										date: date
									})
								}
								community.total_travel_green += 1;
							}
						}
						cur_user.travel_green.shift()
						community.travel_green.shift()

						let travel_green = [];

						community.travel_green.forEach(function(c){
							let tid = getGreenStatus(cur_user.travel_green, c.date)
							if(tid != 0){
								travel_green.push({
									date: c.date,
									com: c.value, 
									user: cur_user.travel_green[tid].value
								});
							}else{
								travel_green.push({
									date: c.date,
									com: c.value, 
									user: 0
								});								
							}
						});

						cur_user.green_travel_per = Math.ceil(cur_user.green_travel / 500)
						cur_user.yellow_travel_per = Math.ceil(cur_user.yellow_travel / 500)
						cur_user.red_travel_per = Math.ceil(cur_user.red_travel / 500)
						cur_user.total_session_donut = Math.ceil(cur_user.total_session / 5000)


						Project.find({private: false}, function(err, projects){
							community.total_project = projects.length;
							var custom_projects = []
							projects.forEach(function(p){
								if(p.user_id == req.session.user._id) {
									cur_user.total_project_donut += 1
									custom_projects.push(p)
								}
							})
							Comment.find({}, function(err, comments){
								community.total_comment = comments.length;

								custom_projects.forEach(function(p){
									comments.forEach(function(c){
										if(c.project_id == p._id){
											cur_user.total_comment_donut += 1;
										}
									});									
								});

								Message.find({}, function(err, messages) {
									community.total_message = messages.length;

									messages.forEach(function(m){
										if(m.from == req.session.user._id || m.to == req.session.user._id){
											cur_user.total_message_donut += 1
										}
									})
									Game.find({}, function(err, games){
										community.total_game = games.length;

										community.total_points = community.total_game * 10 + community.total_project * 5 + community.total_travel_green * 5;

										community.total_session_bar = Math.ceil(community.total_session / 5000)
										games.forEach(function(g){
											if(g.user_id == req.session.user._id){
												cur_user.point += g.point
												cur_user.total_game_donut += 1
											}
										});

										projects.forEach(function(p){
											if(p.user_id == req.session.user._id){
												cur_user.point += 5
											}
										});

										console.log(community)
										console.log(cur_user)

										res.render('index', { 
											title: 'Express', 
											user: req.session.user,
											count: count,
											cur_user: cur_user,
											community: community,
											travel_green: travel_green });

									})
								})
							})
						})

						
						
					});


					
				})
			});
			
		}
	})

});

module.exports = router;	


function getGreenStatus(valueArray, d){
	let gid = 0;
	for(let i = 0; i < valueArray.length; i++) {
		if(valueArray[i].date == d) {
			gid = i;
			// break;
		}
	}
	return gid;
}