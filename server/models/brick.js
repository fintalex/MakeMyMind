const mongoose = require('mongoose');
const _ = require('underscore');

const brickSchema = mongoose.Schema({
    description: {
        type: String
    }, 
    brickType: { type: mongoose.Schema.Types.ObjectId, ref: 'BrickType', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: {
        type: Date,
        default: Date.now()
    }
});

function daysInMonth (month, year) {
    return new Date(year, month + 1, 0).getDate();
}

brickSchema.statics.getAllBricksForMonthByUserId = (userId, date, nick, habbits, callback) => {
    console.log("Date is = ", date);
    var firstDayInMonth = (new Date(date));
    firstDayInMonth.setDate(0);
    //firstDayInMonth.setHours(0,0,0,0);
    //console.log("firstDayInMonth = ", firstDayInMonth);
    firstDayInMonth.setHours(0,0,0,0);
    console.log("FIRST DAY IN MONTH = ", firstDayInMonth);

    var firstDayInNextMonth = new Date(date);
    console.log("LAST DAY IN MONTH = ", firstDayInNextMonth);

    firstDayInNextMonth = new Date(firstDayInNextMonth.getFullYear(), firstDayInNextMonth.getMonth() + 1, 1);
    firstDayInNextMonth.setHours(0,0,0,0);
    //firstDayInNextMonth.setDate(firstDayInNextMonth.getMonth(), firstDayInNextMonth.getFullYear());
    console.log("LAST DAY IN MONTH = ", firstDayInNextMonth);
    console.log("======NICK ==========="+nick+"=====", nick);

    // HERE if NICK not empty - then find by NICK and NotPrivate

    var userCondition = nick ? 'user.nickname' : 'user';
    var userVal = nick ? nick : userId;
    var matchCondition = 
        {
            'date': {
                '$gte': firstDayInMonth, 
                '$lt': firstDayInNextMonth 
            },
            // 'user.nickname': nick,
            // $or: [
            //     { 'brickType.isPrivate': {$exists: false} }, 
            //     { 'brickType.isPrivate': false },
            // ]
        };

    if (nick){
        matchCondition['user.nickname'] = nick;
        matchCondition['$or'] = [
                { 'brickType.isPrivate': {$exists: false} }, 
                { 'brickType.isPrivate': false },
            ];
    } else {
        matchCondition['user._id'] = mongoose.Types.ObjectId(userId);
    }

    if(habbits && habbits.length > 0){
        var mongList = [];
        _.forEach(habbits, (hab)=>{
            mongList.push(mongoose.Types.ObjectId(hab));
        });

        matchCondition['brickType._id'] = {$in: mongList};
    }

    console.log("MATHC CONDITION - ", matchCondition);

    Brick.aggregate(
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
                    from: 'BrickTypes',
                    localField: 'brickType',
                    foreignField: '_id',
                    as: 'brickType'
                }
            },
            {
                $lookup: {
                    from: 'Categories',
                    localField: 'brickType.category',
                    foreignField: '_id',
                    as: 'category'
                }
            },
            {
                $unwind: '$user'
            },
            {
                $unwind: '$brickType'
            },
            {
                $unwind: '$category'
            },
            {
                $match: matchCondition
            },
            {
                $project: {
                    'brickType.sign': 1,
                    'brickType.isIcon': 1,
                    'brickType._id': 1,
                    'brickType.name': 1,
                    'brickType.category.color': '$category.color',
                    'date': 1,
                    'description': 1
                }
            }
        ])
        // .populate({ path: 'brickType', select: 'sign name', populate: { path: 'category', select: 'color' }})
        // .populate({ path: 'user', select: 'nickname', where: 'nickname' })  
        // //.populate({ path: 'user', select: 'nickname', match: { 'nickname': nick} })  
        // .where({'user': {$match: {'nickname': 'ddd'}}})
        .exec(callback);
};

brickSchema.statics.getBrickById = (brickId, calllback) => {
    Brick.find({'_id': brickId}, calllback);
};

brickSchema.statics.addBrick = (brick, callback) => {
    Brick.create(brick)
        .then((createdBrick)=> { 
            Brick.populate(createdBrick, 
                { 
                    path: 'brickType', 
                    select: 'sign name isIcon', 
                    populate: { path: 'category', select: 'color' }
                }, callback);
        });   
}

brickSchema.statics.updateBrick = (id, brick, callback) => {
    Brick.findByIdAndUpdate(id, brick, { new: true})
        .then((updatedBrick)=> { 
            Brick.populate(updatedBrick, 
                { 
                    path: 'brickType', 
                    select: 'sign name isIcon', populate: 
                    { path: 'category', select: 'color' }
                }, callback);
        }); 
}

const Brick = mongoose.model('Brick', brickSchema, 'Bricks');
module.exports = Brick;