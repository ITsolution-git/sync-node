var express = require('express');
var router = express.Router();
var session = require('express-session');
var User = require('../models/user');
var encrypt = require('../utils/encryption');
var path = require('path');
var userActivity = require('../models/user_activity');

// Get Request Profile page
router.get('/profile', function(req, res, next) {
    userActivity.find({user_id: user._id}, function(err, acts){
        res.render('pages-profile', {
            title: 'Settings Profile', 
            menu: 'activity', 
            user: req.session.user, 
            message: '',
            acts: acts
        });
    })
});


// Get Request Settings Page
router.get('/settings', function(req, res, next) {
    var sess = req.session;
    User.findOne({ email: sess.email }, function(err, user) {
        if (err || user == null) {
            console.log("user not found")
                // res.render('pages-profile', {
                //     error: err,
                //              message: "Email or Password is incorrect! Plase try again"
                // })
        } else {
            userActivity.find({user_id: user._id}, function(err, acts){
                res.render('pages-profile', {
                    title: 'Settings Profile',
                    menu: 'settings',
                    user: user,
                    message: '',
                    acts: acts
                });
            })
        }
    })
});

// Get Request Goups Page
router.get('/groups', function(req, res, next) {
    User.find({_id: {$ne: req.session.user._id}}, function(err, users){
        console.log("===================================", req.session.user)
        res.render('pages-profile', { 
            title: 'Settings Groups', 
            menu: 'groups', 
            users: users, 
            user: req.session.user, 
            message: ''});        
    })
});


// Update user profile
router.post('/settings', function(req, res, next) {
    var body = req.body;
    var sess = req.session;

    console.log(body)
    console.log(sess)

    if (req.files) {
        console.log(req.files)
        let sampleFile = req.files.image,
            filename = (new Date % 9e6).toString(36);

        if (sampleFile != undefined) {
            filename = (filename + sampleFile.name).replace(/\s+/g, '_');

            var link = '/images/profile/' + filename,
                filePath = path.join(__dirname, '../public/', link);
            // Use the mv() method to place the file somewhere on your server 
            sampleFile.mv(filePath, function(err) {
                if (err)
                    return res.status(500).send(err);

                User.findOne({ email: sess.email }, function(err, user) {
                    if (err || user == null) {
                        console.log("user not found")
                    } else {
                        var activityArray = [], activity = '';
                        if(user.first_name != body.first_name) activityArray.push('First Name')
                        user.first_name = body.first_name;
                        if(user.last_name != body.last_name) activityArray.push('Last Name')
                        user.last_name = body.last_name;
                        if(user.email != body.email) activityArray.push('Email')
                        user.email = body.email;
                        if(user.password != encrypt.hashPwd(user.salt, body.password)) activityArray.push('password')
                        user.password = encrypt.hashPwd(user.salt, body.password);
                        if(user.education_level != body.education_level) activityArray.push('Education Level')
                        user.education_level = body.education_level;
                        if(user.image != link) activityArray.push('Image Link')
                        user.image = link;
                        if(activityArray.length != 0) {
                            activity = activityArray.join(', ')
                        }


                        uActivity = new userActivity({
                            user_id: user._id,
                            title: 'Update Profile',
                            activity: 'You updated your profile' + activity + ' at ' + (new Date()).toISOString().substring(0, 10)
                        });

                        uActivity.save(function(err){})

                        user.save(function(err) {
                            req.session.email = user.email;
                            req.session.user = user;

                            res.render('pages-profile', {
                                title: 'Settings Profile',
                                menu: 'settings',
                                user: user,
                                message: 'The profile has been updated successfully',
                            });
                        });
                    }
                })

            });
        } else {
            res.render('pages-profile', { 
                title: 'Settings Profile',
                menu: 'settings',
                user: req.session.user,
                message: 'You should upload your profile image' 
            });
        }
    }
});


module.exports = router;
