const mongoose = require('mongoose');
const Frend = require('./frend');

const _ = require('underscore');

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
    },
    helper:  { 
        calendarMainHelp:  { type: Boolean, default: false },
        categoryMainHelp:  { type: Boolean, default: false },
        brickTypeMainHelp:  { type: Boolean, default: false },
        wallSideNavShow: { type: Boolean, default: true }
    }
});

userSchema.statics.getAllUsersForDDl = (str, userId, callback) => {
    User.find(
        {
            '_id': { $ne: userId }, 
            '$or': [
                {'nickname': {$regex : ".*" + str + ".*", $options: 'i'}}, 
                {'username': {$regex : ".*" + str + ".*", $options: 'i'}},
            ]
        }, callback);
};

userSchema.statics.getNewUsersForDDL = (str, userId, callback) => {
    Frend.find(
        {
            '$or' : [
                {'frend': userId },
                {'user': userId }
            ]
        }).exec()
        .then((frends) => {
            //console.log("AND HERE OUR FRENDS: ", frends);
            var frendsIdsList = [];
            frends.forEach((f)=>{
                if (!_.any(frendsIdsList, (curF) => curF.equals(f.frend))){
                    frendsIdsList.push(mongoose.Types.ObjectId(f.frend));
                }

                if (!_.any(frendsIdsList, (curF) => curF.equals(f.user))){
                    frendsIdsList.push(mongoose.Types.ObjectId(f.user));
                }
            });

            User.find(
                {
                    '_id': { $ne: userId },
                    '_id': { $nin: frendsIdsList },
                    '$or': [
                        {'nickname': {$regex : ".*" + str + ".*", $options: 'i'}}, 
                        {'username': {$regex : ".*" + str + ".*", $options: 'i'}},
                    ]
                }, callback);
        });
}

userSchema.statics.getUserById = (userId, calllback) => {
    User.find({'_id': userId}, calllback);
};

userSchema.statics.addUser = (user, callback) => {
    User.create(user, callback);
}

userSchema.statics.chechDuplicateEmail = (username, callback) => {
    User.findOne({'username': username}, callback);
}

userSchema.statics.chechDuplicateNickname = (nickname, callback) => {
    User.findOne({'nickname': nickname}, callback);
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

userSchema.statics.updateUserHelper = (id, helper, callback) => {
    console.log("helper is " + helper + ", and Userid is - " + id);
    User.update({'_id': id}, 
                { $set: 
                    {
                        'helper': helper
                    }
                }, callback);      
}


// module.exports = mongoose.model('User', UserSchema, 'Users');
const User = mongoose.model('User', userSchema, 'Users');
//const Frend = mongoose.model('Frend', frendSchema, 'Frends');
module.exports = User;