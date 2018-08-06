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

// Change Frend Status
router.post('/changeStatus', (req, res, next) => {
    console.log("Change Frend Status", req.body);
    let response = {success: true};
    Frend.changeStatus(req.body, (err, frend) => {
        if (err) {
            response.msg = err.msg;
            res.json(response);
        } else { 
            response.success = true;
            response.msg = "frend status successfuly changed";
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

// DELETE Frend (soft deleting)
router.delete('/:id', function(req, res) {
    console.log('Deleting FREND', req.params.id);
    Frend.findByIdAndRemove(req.params.id, (err, deletedFrend) => {
        if (err){
            res.send('Error deleting frend');
        } else {
            res.json(deletedFrend);
        }
    })
});

module.exports = router;