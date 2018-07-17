var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Frend = require('../models/frend');

// POST create frend
router.post('/', (req, res, next) => {
    console.log("POST Frend API");
    let response = {success: true};
    Frend.addFrend(req.body, (err, frend) => {
        if (err) {
            response.msg = err.msg;
            res.json(response);
        } else { 
            response.success = true;
            response.msg = "frend successfuly created";
            res.json(frend);
        }
    });
});

// GET frends by UserId
router.get('/:id', function(req, res, next){
    console.log("GET FRENDS by id API -", req.params.id);
    Frend.getFrendsByUserId(req.params.id, (err, frends) => {
        //console.log("MY frends - ", frends);
        if (err){
            console.log('Error getting frends by id');
        } else {
            res.json(frends);
        }
    });
});

module.exports = router;