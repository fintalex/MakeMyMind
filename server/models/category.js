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
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    isRemoved: {
        type: Boolean,
        default: false
    },
});



categorySchema.statics.getAllCategoriesByUserId = (userId, callback) => {
    Category.find(
        {
            'user': userId, 
            '$or': [
                {'isRemoved': {$exists: false}}, 
                {'isRemoved': false}
            ]
        }, callback);
};

categorySchema.statics.getCategoryById = (categoryId, calllback) => {
    Category.find({'_id': categoryId}, calllback);
};

categorySchema.statics.addCategory = (category, callback) => {
    Category.create(category, callback);
}

categorySchema.statics.softDeleteCategory = (id, callback) => {
    Category.update({'_id': id}, 
                { $set: 
                    {
                        'isRemoved': true
                    }
                }, callback);  
}
     

const Category = mongoose.model('Category', categorySchema, 'Categories');
module.exports = Category;