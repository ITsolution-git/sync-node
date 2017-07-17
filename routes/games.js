var express = require('express');
var router = express.Router();
var session = require('express-session');
var Game = require('../models/game');
var User = require('../models/user');
router.get('/index', function(req, res, next) {

	Game.find({}, function(err, games) {

		if(games.length == 0) {
			var game1 = new Game({
				link: "https://ellisonleao.github.io/clumsy-bird/",
				name: "Clumsy Bird",
				description: "Remember Flappy Bird? The game that took the app stores by storm and made everyone wonder how can such a simple yet hard to play game be so addictive? Well, now you can find the source code of its clone made in HTML5 and called Clumsy Bird. This game is developed by Ellison Leão and he has made an easy customizing guide also available for his game, in case you get inspired to clone this clone.",
				image_link: "https://superdevresources.com/wp-content/uploads/2014/09/clumsy-bird-open-source-game.png",
				point: 10
			})

			var game2 = new Game({
				link: "https://hextris.github.io/hextris/",
				name: "Hextris",
				description: "Hextris is a fast paced puzzle game developed by Garrett Finucane and Logan Engstrom. As the name suggests, this game is like playing Tetris on a Hexagonal plane. Apart from playing this game online, you can also find it in Android and iOS store.",
				image_link: "http://superdevresources.com/wp-content/uploads/2014/09/hextris-open-source-web-game.png",
				point: 10
			})

			var game4 = new Game({
				link: "http://arandomurl.com/2010/07/25/html5-pacman.html",
				name: "HTML5 Pacman",
				description: "This a HTML5 clone of the original Pacman game.",
				image_link: "http://superdevresources.com/wp-content/uploads/2014/09/open-source-pacman-game.png",
				point: 10
			})

			var game5 = new Game({
				link: "https://wwwtyro.github.io/Astray/",
				name: "Astray",
				description: "Astray is a WebGL maze game built with Three.js and Box2dWeb. Developed by Rye Terrell, this game is a nice demo of 3D capabilities in HTML5 games. If you want an even richer experience of a 3D HTML5 game, you can look forward to Assasin Creed Pirates.",
				image_link: "http://superdevresources.com/wp-content/uploads/2014/09/astray-webgl-maze-game-open-source.jpg",
				point: 10
			})

			var game6 = new Game({
				link: "http://dionyziz.logimus.com/tetris/",
				name: "Canvas Tetris",
				description: "",
				image_link: "http://superdevresources.com/wp-content/uploads/2014/09/html5-tetris-game.png",
				point: 10
			})

			var game7 = new Game({
				link: "http://agent8ball.com/",
				name: "Agent 8 ball",
				description: "Agent 8 ball is a fun HTML5 pool game with bombs. Developed by Pixel Lab, Agent 8 ball is quite a polished game.",
				image_link: "http://superdevresources.com/wp-content/uploads/2014/09/agent-8-ball-free-game.jpg",
				point: 10
			})

			game1.save(function(err){
				if(err){
					console.log(err)			
				}else {
					console.log("game1 success")
				}
			})

			game2.save(function(err){
				if(err){
					console.log(err)			
				}else {
					console.log("game2 success")
				}
			})

			game4.save(function(err){
				if(err){
					console.log(err)			
				}else {
					console.log("game4 success")
				}
			})

			game5.save(function(err){
				if(err){
					console.log(err)			
				}else {
					console.log("game5 success")
				}
			})

			game6.save(function(err){
				if(err){
					console.log(err)			
				}else {
					console.log("game6 success")
				}
			})
			game7.save(function(err){
				if(err){
					console.log(err)			
				}else {
					console.log("game7 success")
				}
			})

		}

		res.render('page-games', { 
			title: 'Games Lists',
			user: req.session.user,
			games: games });		
	})
});

module.exports = router;