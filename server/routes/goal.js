const express = require('express');
const router = express.Router();
const Goal = require('../models/goal');

const goalService  = require('./../services/goal');

//import * as goalService from './../services/goal';
//import { getGoalsByUser } from './../services/goal';

//var Frend = require('../models/frend');

// Http://localhost:5015/api/getByUserId (GET)
router.get('/', async (req, res) => {
    const goals = await Goal.find({});

    res.status(200).json(goals);
});

router.get('/getByUserId/:userId', goalService.getGoalsByUser);

// router.get('/getByUserId/:userId', async (req, res, next) => {
    
//     // console.log("GET all Goals by user id API. PARAMS are : ", req.params);

//     // const goals = await Goal.find({'user': req.params.userId});

//     // res.status(200).json(goals);
// });

router.get('/getGoalById/:goalId', async (req, res) => {

    const curGoal = await Goal.findOne({'_id': req.params.goalId});

    res.status(200).json(curGoal);
});

// Http://localhost:5015/api/goal (POST)
router.post('/', async (req, res) => {

    const goal = new Goal(req.body);

    await goal.save();

    res.status(201).json(goal);
});

// Http://localhost:5015/api/goal/23 (DELETE)
router.delete('/:id', async (req, res) => {
    await Goal.remove({_id: req.params.id});
    res.status(200).json({
        message: 'Deleted'
    });
});

module.exports = router;