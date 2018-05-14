var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var BrickType = require('../models/brickType');

// GET all BrickTypes by User id
router.get('/getByUserId/:userId', function(req, res, next){
    console.log("GET all brickType types API");
    BrickType.getAllBrickTypesByUserId(req.params.userId, (err, brickTypes) => {
        console.log("BrickType Types - ", brickTypes);
        if(err){
            console.log('Error get brickType types', err);
        } else {
            res.json(brickTypes);
        }
    });
});

// GET BrickType by id 
router.get('/:id', function(req, res, next){
    //console.log("GET BrickType by id API");
    BrickType.getBrickTypeById(req.params.id, (err, brickType) => {
        if (err){
            console.log('Error getting BrickType by id');
        } else {
            res.json(brickType);
        }
    });
});

// POST create brickType
router.post('/', (req, res, next) => {
    let response = {success: true};
    //console.log('brickType body - ', req.body);
    BrickType.addBrickType(req.body, (err, brickType) => {
        console.log('BrickType = ', brickType);
        if (err){
            console.log('Error posting brickType -', err);
        } else {
            res.json(brickType);
        }
    });
});

// PUT update brickType
router.put('/', (req, res, next) => {
    console.log("YEHA - got the PUT BrickType API");
    console.log("BrickType is = ", req.body);
    let response = {success: true};
    BrickType.updateBrickType(req.body._id, req.body, (err, brickType) => {
        if (err){
            console.log('Error updating brickType');
        } else {
            console.log('BrickType after updating = ', brickType);
            res.json(brickType);
        }
    });
});

router.delete('/:id', function(req, res) {
    console.log('Deleting BrickType');
    BrickType.softDeleteBrickType(req.params.id, (err, deletedBrickType) => {
        if (err){
            res.send('Error deleting BrickType');
        } else {
            res.json(deletedBrickType);
        }
    })
});


module.exports = router;