const mongoose = require('mongoose');
const _ = require('underscore');
const BrickType = require('./brickType');

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
                    'brickType.type': 1,
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
                    select: 'sign name isIcon type', 
                    populate: { path: 'category', select: 'color' }
                }, callback);
        });   
}

brickSchema.statics.addBrickMulty = (bricks, callback) => {
    //console.log("------addBrickMulty STARTS  -----", bricks);
    // HERE WE NEED TO THINK ABOUT MULTY INPUT
    if (bricks.brickTypeArray && bricks.brickTypeArray.length > 0){

        var resBricksArray = [];
        function addBricks(newBrick, index){
            console.log("------ I AM IN addBricks -----", newBrick);
            resBricksArray.push(newBrick);
            console.log("------ resBricksArray IS ----- INDEX IS " + index, resBricksArray);
            if(index >= bricks.brickTypeArray.length -1){
                console.log("+++++++++++ YEHA!!! I WANT TO CALLBACK IT ++++++++++++++++++++ AND INDEX IS + "+index+" and callBack is " + callback);
                callback(null, resBricksArray);
            }else {
                i++;
                addNextBrick();
            }
        }

        console.log("------ START CREATING MULTY -----");
        var i=0;
        addNextBrick();

        function addNextBrick(){
            // CHANGE ONLY brickTYPE id and ADD IT
            bricks.brickType = bricks.brickTypeArray[i]._id;
            Brick.create(bricks)
                .then((createdBrick)=> { 
                    console.log("--createdBrick BEFORE POPULATE --------", createdBrick);

                    // HERE MUST BE a function for INCREMENTING COUNT for BrickType.countMarked
                    BrickType.updateCountMarked(createdBrick.brickType, 1, (err, updateBrickType)=> {
                        console.log("!!!!!!!!!!!!!!!!!!! HEY I INCREMENTED HIM !!!!!!!!!!!!!!!!!!!!!", updateBrickType);
                    });

                    Brick.populate(
                        createdBrick, 
                        { 
                            path: 'brickType', 
                            select: 'sign name isIcon type', 
                            populate: { path: 'category', select: 'color' }
                        }, 
                        (err, populatedBrick)=>{
                            addBricks(populatedBrick, i);
                        });
                        
                });  
        }


        // var resBricksArray = [];
        // function addBricks(newBrick, index){
        //     console.log("------ I AM IN addBricks -----", newBrick);
        //     resBricksArray.push(newBrick);
        //     console.log("------ resBricksArray IS -----", resBricksArray);
        //     if(index == bricks.brickTypeArray.length){
        //         callback(resBricksArray);
        //     }
        // }

        // console.log("------ START CREATING MULTY -----");
        // for(var i=0; i < bricks.brickTypeArray.length; i++){
        //     // CHANGE ONLY brickTYPE id and ADD IT
        //     bricks.brickType = bricks.brickTypeArray[i]._id;
        //     Brick.create(bricks)
        //         .then((createdBrick)=> { 
        //             console.log("--createdBrick BEFORE POPULATE --------", createdBrick);
        //             Brick.populate(
        //                 createdBrick, 
        //                 { 
        //                     path: 'brickType', 
        //                     select: 'sign name isIcon type', 
        //                     populate: { path: 'category', select: 'color' }
        //                 }, 
        //                 (err, populatedBrick)=>{
        //                     addBricks(populatedBrick, i);
        //                 });
                        
        //         });  
        // }

        // callback(resBricksArray);

    } else {
        callback();
        // Brick.create(bricks.brickTypeArray[0])
        //     .then((createdBrick)=> { 
        //         Brick.populate(createdBrick, 
        //             { 
        //                 path: 'brickType', 
        //                 select: 'sign name isIcon type', 
        //                 populate: { path: 'category', select: 'color' }
        //             }, callback);
        //     }); 
    }  
}

brickSchema.statics.updateBrick = (id, brick, callback) => {

    updateCountMarkedForBrickType(id, -1);

    Brick.findByIdAndUpdate(id, brick, { new: true})
        .then((updatedBrick)=> { 

            BrickType.updateCountMarked(updatedBrick.brickType, 1, (err, updateBrickType)=> {
                console.log("!!!!!!!!!!!!!!!!!!! HEY I inc HIM !!!!!!!!!!!!!!!!!!!!!", updateBrickType);
            });

            Brick.populate(updatedBrick, 
                { 
                    path: 'brickType', 
                    select: 'sign name isIcon type', populate: 
                    { path: 'category', select: 'color' }
                }, callback);
        }); 
}

brickSchema.static.updateCountMarkedByBrickId = (id, count) => {
    updateCountMarkedForBrickType(id,count);
}

var updateCountMarkedForBrickType = (id, count)=> {
    Brick.findOne({'_id': id})
        .exec()
        .then((curBrick)=>{
            BrickType.updateCountMarked(curBrick.brickType, count, (err, updateBrickType)=> {
                console.log("Count is changed", updateBrickType);
            });
        });
}

brickSchema.statics.deleteBrickType = (id, callback) => {
    console.log("DELETING - ", id);
    Brick.findByIdAndRemove(id, (err, deletedBrick) => {
        BrickType.updateCountMarked(deletedBrick.brickType, -1, (err, updateBrickType)=> {
            console.log("!!!!!!!!!!!!!!!!!!! HEY I DECREMENTED HIM !!!!!!!!!!!!!!!!!!!!!", updateBrickType);
        });
        callback(err, deletedBrick);
    });
}

const Brick = mongoose.model('Brick', brickSchema, 'Bricks');
module.exports = Brick;