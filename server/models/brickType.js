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
    isIcon: {
        type: Boolean
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
    // isRemoved: {
    //     type: Boolean,
    //     default: false
    // },
    isPrivate: { type: Boolean, default: true },
    type: { type: Number, default: 1 }, // 1- permanent, 2- for period.
    status: { type: Number, default: 1 }, // 1- active, 2- closed (for permanent), 3- successed (for period), 4- failed (for period)
    neededDays: { type: Number },
    countMarked: { type: Number },
    allowedSkipDays: { type: Number },
    skippedDays: { type: Number }
});

brickTypeSchema.statics.getAllBrickTypesByUserId = (userId, callback) => {        
    BrickType.find(
        {
            'user': userId, 
            // $or: [
            //     {'isRemoved': {$exists: false}}, 
            //     {'isRemoved': false}
            // ]
        }, callback)
        .populate('category');
};

brickTypeSchema.statics.getAllBrickTypesByNickname = (nickname, callback) => {        
    BrickType.aggregate(
        [
            {
                $lookup: {
                    from: 'Users',
                    localField: 'user',
                    foreignField: '_id',
                    as: 'user'
                },
            },
            {
                $lookup: {
                    from: 'Categories',
                    localField: 'category',
                    foreignField: '_id',
                    as: 'category'
                }
            },
            {
                $unwind: '$user'
            },
            {
                $unwind: '$category'
            },
            {
                $match: {
                    'user.nickname': nickname,
                    'isPrivate': false,
                    // $or: [
                    //     {'isRemoved': {$exists: false}}, 
                    //     {'isRemoved': false}
                    // ]
                }
            },
            {
                $project: {
                    'sign': 1,
                    '_id': 1,
                    'name': 1,
                    'category.color': 1,
                    'isPrivate': 1
                }
            }
        ])
        .exec(callback);
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

brickTypeSchema.statics.softDeleteBrickType = (id, callback) => {
    BrickType.update({'_id': id}, 
                { $set: 
                    {
                        'status': 2
                    }
                }, callback);  
}

const BrickType = mongoose.model('BrickType', brickTypeSchema, 'BrickTypes');
module.exports = BrickType;