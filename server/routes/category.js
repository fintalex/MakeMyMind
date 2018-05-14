var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Category = require('../models/category');

// GET all categories by userId
router.get('/getByUserId/:userId', function(req, res, next){
    console.log("GET all categories by user id API");
    Category.getAllCategoriesByUserId(req.params.userId, (err, categories) => {
        //console.log("categories - ", categories);
        if(err){
            console.log('Error getting categories', err);
        } else {
            //console.log('Categories result - ', categories);
            res.json(categories);
        }
    });
});

// GET Category by id 
router.get('/:id', function(req, res, next){
    console.log("GET category by id API");
    Category.getCategoryById(req.params.id, (err, category) => {
        if (err){
            console.log('Error getting category by id');
        } else {
            res.json(category);
        }
    });
});

// POST create Category
router.post('/', (req, res, next) => {
    console.log("YEHA - got the POST Category API");
    console.log(req.body);
    let response = {success: true};
    Category.addCategory(req.body, (err, category) => {
        if (err){
            console.log('Error posting category');
        } else {
            res.json(category);
        }
        // if (err) {
        //     response.msg = err.msg;
        //     res.json(response);
        // } else { 
        //     response.success = true;
        //     response.msg = "Category  successfuly created";
        //     res.json(response);
        // }
    });
});

// PUT update Category
router.put('/', (req, res, next) => {
    console.log("YEHA - got the PUT Category API");
    console.log("Category is = ", req.body);
    let response = {success: true};
    Category.findByIdAndUpdate(req.body._id, req.body, (err, category) => {
        if (err){
            console.log('Error updating category');
        } else {
            console.log('Category after updating = ', category);
            res.json(category);
        }
        // if (err) {
        //     response.msg = err.msg;
        //     res.json(response);
        // } else { 
        //     response.success = true;
        //     response.msg = "Category successfuly updated";
        //     res.json(response);
        // }
    });
});

// DELETE Categoty (soft deleting)
router.delete('/:id', function(req, res) {
    console.log('Deleting category');
    Category.softDeleteCategory(req.params.id, (err, deletedCategory) => {
        if (err){
            res.send('Error deleting category');
        } else {
            res.json(deletedCategory);
        }
    })
});


module.exports = router;