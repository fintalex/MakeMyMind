const mongoose = require('mongoose');

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

brickSchema.statics.getAllBricksForMonthByUserId = (userId, date, nick, callback) => {
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

    // HERE if NICK not empty - then find by NICK and NotPrivate

    Brick.find(
        {
            'user': userId, 
            date: 
                {
                    '$gte': firstDayInMonth, 
                    '$lt': firstDayInNextMonth 
                }
            }, callback)
        .populate({ path: 'brickType', select: 'sign name', populate: { path: 'category', select: 'color' }});
};

brickSchema.statics.getBrickById = (brickId, calllback) => {
    Brick.find({'_id': brickId}, calllback);
};

brickSchema.statics.addBrick = (brick, callback) => {
    Brick.create(brick)
        .then((createdBrick)=> { 
            Brick.populate(createdBrick, { path: 'brickType', select: 'sign name', populate: { path: 'category', select: 'color' }}, callback);
        });   
}

brickSchema.statics.updateBrick = (id, brick, callback) => {
    Brick.findByIdAndUpdate(id, brick, { new: true})
        .then((updatedBrick)=> { 
            Brick.populate(updatedBrick, { path: 'brickType', select: 'sign name', populate: { path: 'category', select: 'color' }}, callback);
        }); 
}

const Brick = mongoose.model('Brick', brickSchema, 'Bricks');
module.exports = Brick;