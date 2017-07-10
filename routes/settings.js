var express = require('express');
var router = express.Router();
var session = require('express-session');
var User = require('../models/user');
var encrypt = require('../utils/encryption');
var path = require('path');

router.get('/profile', function(req, res, next) {
    res.render('pages-profile', { 
        title: 'Settings Profile', 
        menu: 'activity', 
        user: req.session.user, 
        message: ''});
});

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
            res.render('pages-profile', {
                title: 'Settings Profile',
                menu: 'settings',
                user: user,
                message: ''
            });
        }
    })
});


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
                        user.first_name = body.first_name;
                        user.last_name = body.last_name;
                        user.email = body.email;
                        user.password = encrypt.hashPwd(user.salt, body.password);
                        user.education_level = body.education_level;
                        user.college_name = body.college_name;
                        user.image = link;

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
