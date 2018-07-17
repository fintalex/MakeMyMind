const mongoose = require('mongoose');

const frendSchema = mongoose.Schema({
    user:  { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    frend: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    requestStatus: { type: Number, default: 1 }, // 1-RequestIsSent, 2-RequestIsRejected, 3-RequestIsApproved
    //isRemoved: { type: Boolean, default: false }
});

frendSchema.statics.getFrendsByUserId = (userId, callback) => {
    // Frend.find(
    //     {
    //         '$or' : [
    //             {'frend': userId },
    //             {'user': userId }
    //         ]
    //     }, callback);
    Frend.aggregate(
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
                    from: 'Users',
                    localField: 'frend',
                    foreignField: '_id',
                    as: 'frend'
                }
            },
            {
                $unwind: '$user'
            },
            {
                $unwind: '$frend'
            },
            {
                $match: {
                    '$or' : [
                        {'frend._id': mongoose.Types.ObjectId(userId) },
                        {'user._id': mongoose.Types.ObjectId(userId) }
                    ]
                }
            },
            {
                $project: {
                    'requestStatus': 1,
                    '_id': 1,
                    // 'user._id': 1,
                    // 'user.nickname': 1,
                    // 'user.username': 1,
                    //'frend._id': 1,
                    'frendId':  { $cond: { if: { "$eq": [ "$frend._id", mongoose.Types.ObjectId(userId) ] }, then: "$user._id", else: "$frend._id" }},
                    'frendNickname': { $cond: { if: { "$eq": [ "$frend._id", mongoose.Types.ObjectId(userId) ] }, then: "$user.nickname", else: "$frend.nickname" }},
                    'frendUsername': { $cond: { if: { "$eq": [ "$frend._id", mongoose.Types.ObjectId(userId) ] }, then: "$user.username", else: "$frend.username" }},
                    'requestForYou': { 
                        $cond: { 
                            if: { 
                                '$eq': [ "$frend._id", mongoose.Types.ObjectId(userId) ] 
                            }, 
                            then: true, 
                            else: false
                        }
                    }
                }
            }
        ]
    )
    .exec(callback);
};

frendSchema.statics.addFrend = (frend, callback) => {
    Frend.create(frend)
        .then((createdFrend) =>{
            Frend.populate(createdFrend, {path: 'frend', model: 'User'}, callback);
        });
}

frendSchema.statics.softDeleteCategory = (id, callback) => {
    Frend.update({'_id': id}, 
                { $set: 
                    {
                        'isRemoved': true
                    }
                }, callback);  
}

// frendSchema.statics.updateFrendRequestStatus = (userId, frendId, statusId, callback) => {
//     console.log("Frend is -" + frendId + ", and userid is - " + userId);
//     User.update({'userId': userId, 'frendId': frendId}, 
//                 { $set: 
//                     {
//                         'requestStatus': statusId
//                     }
//                 }, callback);      
// }

const Frend = mongoose.model('Frend', frendSchema, 'Frends');
module.exports = Frend;