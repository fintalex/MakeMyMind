const mongoose = require('mongoose');

//const schemaInst = mongoose.Schema;
const goalSchema = mongoose.Schema({
//const goalSchema = new schemaInst({
    name: {
        type: String,
        required: true
    },
    status: { type: Number, default: 1 }, // 1- active, 2- closed (for permanent), 3- successed (for period), 4- failed (for period)
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    finishDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    conditions: [
        {
            brickType: { type: mongoose.Schema.Types.ObjectId, ref: 'BrickType', required: true },
            neededCount: { type: Number, required: true, default: 3 }, 
            markedCount: { type: Number, required: true, default: 0 }
        }
    ]
});


module.exports = mongoose.model('Goal', goalSchema, 'Goals');

// const Goal = mongoose.model('Goal', goalSchema, 'Goals');
// module.exports = Goal;