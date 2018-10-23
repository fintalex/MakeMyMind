var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Brick = require('../models/brick');

// post all Bricks For Monthe by User id
router.post('/getForMonth', function(req, res, next){
    console.log("GET all bricks API for Month -", req.body);

    Brick.getAllBricksForMonthByUserId(req.body.userId, req.body.date, req.body.nick, req.body.habbits, (err, bricks) => {
        console.log("Bricks - ", bricks);
        if(err){
            console.log('Error ret bricks');
        } else {
            //console.log('Brick result - ', Bricks);
            res.json(bricks);
        }
    });
});

// GET Brick by id 
router.get('/:id', function(req, res, next){
    console.log("GET Brick by id API");
    Brick.getBrickById(req.params.id, (err, brick) => {
        if (err){
            console.log('Error getting brick by id');
        } else {
            res.json(brick);
        }
    });
});

// POST create Brick
router.post('/', (req, res, next) => {
    let response = {success: true};
    console.log('Brick body - ', req.body);
    Brick.addBrick(req.body, (err, brick) => {
        console.log('Brick = ', brick);
        if (err){
            console.log('Error posting brick -', err);
        } else {
            res.json(brick);
        }
    });
});

router.post('/createMulty', (req, res, next) => {
    let response = {success: true};
    console.log('Brick body MULTY - ', req.body);
    Brick.addBrickMulty(req.body, (err, bricks) => {
        console.log('MULTY Bricks = ', bricks);
        if (err){
            console.log('Error posting bricks -', err);
        } else {
            res.json(bricks);
        }
    });
});

// PUT update Brick
router.put('/', (req, res, next) => {
    console.log("YEHA - got the PUT Brick API");
    console.log("Brick is = ", req.body);
    Brick.updateBrick(req.body._id, req.body, (err, brick) => {
        if (err){
            console.log('Error updating brick');
        } else {
            console.log('Brick after updating = ', brick);
            res.json(brick);
        }
    });
});

router.delete('/:id', function(req, res) {
    console.log('Deleting brick');
    Brick.findByIdAndRemove(req.params.id, (err, deletedBrick) => {
        if (err){
            res.send('Error deleting brick');
        } else {
            res.json(deletedBrick);
        }
    })
});


module.exports = router;