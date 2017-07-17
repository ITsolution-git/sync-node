var express = require('express');
var router = express.Router();
var session = require('express-session');
var encrypt = require('../utils/encryption');
var User = require('../models/user');
var AuthTime = require('../models/authtime');

/* GET login page. */
router.get('/login', function(req, res, next) {
  res.render('auth/pages-login-website-light', { title: 'Express', message: '' });
});

router.post('/login', function(req, res, next){
    var body = req.body,
         sess = req.session;

    User.findOne({email: body.email}, function(err, user){
        if(err || user == null) {
            res.render('auth/pages-login-website-light', {
                login: false,
                error: err,
                message: "Email or Password is incorrect! Plase try again"
            })
        }else{
            if(user.authenticate(body.password)){
                req.session.email=req.body.email;
                req.session.user_id = user._id;
                req.session.user = user;

                var auth_time = new AuthTime({
                    user_id: user._id,
                    login: new Date(),
                    logout: ''
                });
                auth_time.save(function(err, auth_t){
                    req.session.auth_time_id = auth_t;
                    console.log('User sign in successfully!')
                    res.redirect('/index');                        
                })

            } else {
                res.render('auth/pages-login-website-light', {
                    login: false,
                    error: err,
                    message: "Email or Password is incorrect! Plase try again"
                })  
            }
        }
    })

});

router.get('/signup', function(req, res, next) {
  res.render('auth/pages-signup-website');
});

router.post('/signup', function(req, res, next) {    
    var body = req.body,
        sess = req.session;
    body.salt = encrypt.createSalt();
    body.password = encrypt.hashPwd(body.salt, body.password);

    var new_user = new User({
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        salt: body.salt,
        password: body.password,
        admin: false,
        image: 'images/no-image.jpg'
    });

    new_user.save(function(err, data){
        if (err){ 
            throw(err);
            res.render('auth/pages-signup-website', {
                create: false,
                error: err
            })
        }else{
            sess.email = new_user.email;
            console.log("User created successfully")
            res.redirect('/auth/login');            
        }
    });    
});

router.get('/logout', function(req, res, next) {
    AuthTime.findOne({_id: req.session.auth_time_id}, function(err, auth_t){
        if(err) console.log(err)

        auth_t.logout = new Date();
        auth_t.session = Math.abs(new Date(auth_t.login).getTime() - auth_t.logout.getTime());
        auth_t.save(function(err){
            req.session.destroy(function(err) {
                if(err) {
                    console.log(err);
                } else {
                    res.redirect('/auth/login');
                }
            });            
        })
    })

});

module.exports = router;
