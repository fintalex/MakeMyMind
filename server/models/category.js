const mongoose = require('mongoose');


const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    description: {
        type: String
    }, 
    priority: {
        type: Date,
        required: false,
        default: Date.now()
    },
    updated: {
        type: Date,
        default: Date.now()
    },
    bricks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Brick'}],
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});



categorySchema.statics.getAllCategoriesByUserId = (userId, callback) => {
    Category.find({'user': userId}, callback);
};

categorySchema.statics.getCategoryById = (categoryId, calllback) => {
    Category.find({'_id': categoryId}, calllback);
};

categorySchema.statics.addCategory = (category, callback) => {
    Category.create(category, callback);
}


const Category = mongoose.model('Category', categorySchema, 'Categories');
module.exports = Category;