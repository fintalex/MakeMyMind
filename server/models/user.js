const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
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
    },
    locale: {
        type: String,
        default: 'ru'
    }
});

userSchema.statics.getAllUsers = (callback) => {
    User.find({}, callback);
};

userSchema.statics.getUserById = (userId, calllback) => {
    User.find({'_id': userId}, calllback);
};

userSchema.statics.addUser = (user, callback) => {
    User.create(user, callback);
}

userSchema.statics.loginUser = (user, callback) => {
    User.findOne({'username': user.email, 'password': user.password}, callback);
}

userSchema.statics.updateUserLocale = (id, locale, callback) => {
    console.log("LOCALE is " + locale + ", and id is - " + id);
    User.update({'_id': id}, 
                { $set: 
                    {
                        'locale': locale
                    }
                }, callback);      
}


// module.exports = mongoose.model('User', UserSchema, 'Users');
const User = mongoose.model('User', userSchema, 'Users');
module.exports = User;