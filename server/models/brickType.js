const mongoose = require('mongoose');
const category = require('./category');

const brickTypeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    sign: {
        type: String,
        required: true
    },
    ruleDescription: {
        type: String
    }, 
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdDate: {
        type: Date,
        default: Date.now()
    },
    isRemoved: {
        type: Boolean,
        default: false
    },

});

brickTypeSchema.statics.getAllBrickTypesByUserId = (userId, callback) => {
    BrickType.find({'user': userId}, callback)
        .populate('category');
};

brickTypeSchema.statics.getBrickTypeById = (brickTypeId, calllback) => {
    BrickType.find({'_id': brickTypeId}, calllback);
};

brickTypeSchema.statics.addBrickType = (brickType, callback) => {
    BrickType.create(brickType)
        .then((createdBrickType)=> { 
            BrickType.populate(createdBrickType, { path: 'category', model: 'Category' }, callback);
        });        
}

brickTypeSchema.statics.updateBrickType = (id, brickType, callback) => {
    BrickType.findByIdAndUpdate(id, brickType, { new: true})
        .then((updatedBrickType)=> { 
            BrickType.populate(updatedBrickType, { path: 'category', model: 'Category' }, callback);
        });        
}

const BrickType = mongoose.model('BrickType', brickTypeSchema, 'BrickTypes');
module.exports = BrickType;