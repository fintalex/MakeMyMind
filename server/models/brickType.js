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
    countMarked: { type: Number, default: 0  },
    allowedSkipDays: { type: Number },
    skippedDays: { type: Number, default: 0  }
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

/// HERE in the count we can pass 1 or -1 if we want to INCREMENT or DECREMENT 
brickTypeSchema.statics.updateCountMarked = (id, count, callback) => {
    
    BrickType.findOne({'_id': id})
        .then(brickTypesForUpdating => {

            console.log("+++++++++++++++++++brickTypesForUpdating+++++++++++++",brickTypesForUpdating);


            var updateCondition = { $inc: 
                {
                    'countMarked': count
                }
            };

            console.log("bbrickTypesForUpdating.countMarked + 1 = ", brickTypesForUpdating.countMarked + 1);
            console.log("brickTypesForUpdating.neededDays = ", brickTypesForUpdating.neededDays);
            console.log("brickTypesForUpdating.countMarked + 1 >= brickTypesForUpdating.neededDays = ", brickTypesForUpdating.countMarked + 1 >= brickTypesForUpdating.neededDays);
            
            if (brickTypesForUpdating.countMarked + count >= brickTypesForUpdating.neededDays){
                
                updateCondition.$set =
                {
                    'status': 3
                };
            }

            console.log(" _________________updateCondition______________", updateCondition);
            

            BrickType.update({'_id': id}, 
                updateCondition, callback);  
        });
} 

/// HERE we must update all skippedDays for ALL BrickTypes (in the future it may take many time, and need to refactor it method)
brickTypeSchema.statics.updateSkippeDays = () => {

    console.log("I am in updateSkippeDays in ROUTER");

    BrickType.find(
        {
            'status': 1,
            'type': 2,
            '$or': [   
                {'$and': [
                    { 'allowedSkipDays': {$exists: true} },
                    { 'skippedDays': {$exists: false} }
                ]},                
                { $where: "this.allowedSkipDays > this.skippedDays" }
            ]
        }
    )
    .then(brickTypesForUpdating => {

        console.log("found a few SKIPPED - ", brickTypesForUpdating.length);
        
        brickTypesForUpdating.forEach((brickType)=>{
            var yesterday = new Date();
            yesterday = new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate() - 1);
            yesterday.setHours(0,0,0,0);
            console.log(" yesterday = ", yesterday);

            var yesterday23 = new Date();
            yesterday23 = new Date(yesterday23.getFullYear(), yesterday23.getMonth(), yesterday23.getDate() - 1);
            yesterday23.setHours(23,59,59,0);
            console.log(" yesterday23 = ", yesterday23);

            console.log("---------------------------------- CURRENT BRICK TYPE is "+brickType.name+"-------- allowed days is "+brickType.allowedSkipDays+"------------skipped days is "+brickType.skippedDays+"-----------")

            /// HERE WE NEED TO CHECK WHETHER THE USER MARK THIS brickType yesterday.
            Brick.find(
                {
                    'brickType': brickType._id,
                    'date': {
                        '$gte': yesterday, 
                        '$lt': yesterday23 
                    },
                }
            )
            .then(yesterdaysBrick => {
                console.log("  +++++++++++++++ yesterdaysBrick +++++++++++++++++", yesterdaysBrick);

                if(!yesterdaysBrick || yesterdaysBrick.length == 0){
                    if (brickType.skippedDays + 1 >= brickType.allowedSkipDays){
                        BrickType.update({'_id': brickType._id}, {'status': 4}, (err, updateBrickType) => {
                            console.log("!!!!!!!!!!!!!!!!!!! HEY I CHANGE STATUS FOR IT !!!!!!!!!!!!!!!!!!!!!", updateBrickType);
                        }); 
                    }
                    BrickType.update({'_id': brickType._id},{ $inc:{'skippedDays': 1}}, (err, updateBrickType) => {
                        console.log("!!!!!!!!!!!!!!!!!!! HEY I inc HIM !!!!!!!!!!!!!!!!!!!!!", updateBrickType);
                    }); 
                }
            });
        });
         
    });
}

const BrickType = mongoose.model('BrickType', brickTypeSchema, 'BrickTypes');
module.exports = BrickType; 

const Brick = require('./brick');