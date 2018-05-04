var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var User = require('../models/user');

// GET all users
router.get('/', function(req, res, next){
    console.log("GET all users API 111111");
    User.getAllUsers((err, users) => {
        if(err){
            console.log('Error ret users');
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
    User.addUser(req.body, (err, user) => {
        if (err) {
            response.msg = err.msg;
            res.json(response);
        } else { 
            response.success = true;
            response.msg = "User successfuly created";
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
    console.log("YEHA - got the POST User API");
    let response = {success: true};
    User.findByIdAndUpdate(req.body, (err, user) => {
        if (err) {
            response.msg = err.msg;
            res.json(response);
        } else { 
            response.success = true;
            response.msg = "User successfuly updated";
            res.json(response);
        }
    });
});


module.exports = router;