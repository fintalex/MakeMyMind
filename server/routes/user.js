var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var User = require('../models/user');


// GET all users
router.post('/getusersddl', function(req, res, next){
    console.log("GET all NEW users API", req.body.str);
    User.getNewUsersForDDL(req.body.str, req.body.userId, (err, users) => {
        //console.log('DDL USERS : ', users);
        if(err){
            console.log('Error get users DDL');
        } else {
            res.json(users);
        }
    });
});

// GET user by id 
router.get('/:id', function(req, res, next){
    console.log("GET user by id API");
    User.getUserById(req.params.id, (err, user) => {
        if (err){
            console.log('Error getting user by id');
        } else {
            res.json(user);
        }
    });
});

// POST create user
router.post('/', (req, res, next) => {
    console.log("YEHA - got the POST User API");
    let response = {success: true};
    User.chechDuplicateEmail(req.body.username, (err, userEmail) => {
        console.log("chechDuplicateEmail", userEmail)
        if (userEmail == null){
            User.chechDuplicateNickname(req.body.nickname, (err, userNickname) => {
                console.log("chechDuplicateNickname", userNickname)
                if (userNickname == null){
                    User.addUser(req.body, (err, user) => {
                        if (err) {
                            response.msg = err.msg;
                            res.json(response);
                        } else { 
                            response.user = user;
                            response.success = true;
                            response.msg = "User successfully created";
                            res.json(response);
                        }
                    });
                } else {
                    response.success = false;
                    response.msg = "Nickname is already used"
                    res.json(response);
                }
            });
        } else {
            response.success = false;
            response.msg = "Email is already used"
            res.json(response);
        }
    });    
});

// POST LOGIN method
router.post('/login', (req, res, next) => {
    console.log("YEHA - WE ARE IN LOGIN");
    console.log("req.body - ", req.body);
    let response = {success: true};
    User.loginUser(req.body, (err, user) => {
        console.log("USER IS = ", user);
        if (err) {
            response.success = false;
            response.msg = err.msg;
            res.json(response);
        } else if (user) { 
            response.success = true;
            response.msg = "User successfuly created";
            response.user = user;
            res.json(response);
        } else {
            response.success = false;
            response.msg = "Ваши учетное имя или пароль неправильные.";
            res.json(response);
        }
    });
});

// PUT update user
router.put('/', (req, res, next) => {
    console.log("YEHA - got the PUT User API", req.body);
    let response = {success: true};
    User.findByIdAndUpdate(req.body._id, req.body, (err, user) => {
        if (err) {
            console.log("err - ", err);
            response.msg = err.msg;
            res.json(response);
        } else { 
            console.log("PUT USER SUCCESS", response);
            response.success = true;
            response.msg = "User successfuly updated";
            res.json(response);
        }
    });
});

// update user locale
router.post('/updatelocale', function(req, res, next){
    console.log("updatelocale -", req.body);

    User.updateUserLocale(req.body._id, req.body.locale, (err, user) => {
        console.log("user after change locale - ", user);
        if(err){
            console.log('Error in update user locale');
        } else {user
            res.json(user);
        }
    });
});

// update user helper
router.post('/updatehelper', function(req, res, next){
    console.log("updatehelper -", req.body);

    User.updateUserHelper(req.body._id, req.body.helper, (err, user) => {
        console.log("user after change helper - ", user);
        if(err){
            console.log('Error in update user helper');
        } else {user
            res.json(user);
        }
    });
});



module.exports = router;