const express = require('express');
const router = express.Router();
const Goal = require('../models/goal');

const goalService  = require('./../services/goal');

//import * as goalService from './../services/goal';
//import { getGoalsByUser } from './../services/goal';

//var Frend = require('../models/frend');

// Http://localhost:5015/api (GET)
router.get('/', async (req, res) => {
    const goals = await Goal.find({});

    res.status(200).json(goals);
});

// Http://localhost:5015/api/getGoalsByUserAndStatus/234234 (GET)
router.get('/getGoalsByUserAndStatus/:userId/:status', goalService.getGoalsByUserAndStatus);

// Http://localhost:5015/api/getGoalById/67856 (GET)
router.get('/getGoalById/:goalId', goalService.getGoalById);

// Http://localhost:5015/api/goal (POST)
router.post('/', async (req, res) => {

    const goal = new Goal(req.body);

    await goal.save();

    res.status(201).json(goal);
});

// Http://localhost:5015/api/goal (PUT)
router.put('/', async (req, res) => {
    console.log("PUT goal, ", req.body);

    await Goal.update({_id: req.body._id}, req.body);

    res.status(201).json(goal);
});

// Http://localhost:5015/api/goal/23 (DELETE)
router.delete('/:goalId', goalService.deleteGoal);

module.exports = router;