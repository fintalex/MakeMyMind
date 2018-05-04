const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    nickname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }, 
    created: {
        type: Date,
        required: false,
        default: Date.now()
    },
    updated: {
        type: Date,
        default: Date.now()
    }
});

UserSchema.statics.getAllUsers = (callback) => {
    User.find({}, callback);
};

UserSchema.statics.getUserById = (userId, calllback) => {
    User.find({'_id': userId}, calllback);
};

UserSchema.statics.addUser = (user, callback) => {
    User.create(user, callback);
}

UserSchema.statics.loginUser = (user, callback) => {
    User.findOne({'username': user.email, 'password': user.password}, callback);
}


// module.exports = mongoose.model('User', UserSchema, 'Users');
const User = mongoose.model('User', UserSchema, 'Users');
module.exports = User;