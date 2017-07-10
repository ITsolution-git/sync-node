var express = require('express');
var router = express.Router();
var session = require('express-session');
var Game = require('../models/game')
router.get('/index', function(req, res, next) {

	Game.find({}, function(err, games){
		res.render('page-games', { 
			title: 'Games Lists',
			user: req.session.user,
			games: games });		
	})
});

module.exports = router;