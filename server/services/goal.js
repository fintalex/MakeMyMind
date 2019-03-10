
const Goal = require('./../models/goal');

getGoalsByUser = async (req, res, next) => {
    var userId = req.params.userId
    if (!userId){
        return res.status(500).json({ error: 'Username is not found'});
    }
    try {
        const goals = await Goal.find({'user': userId})
            .populate(
                { 
                    path: "conditions.brickType", 
                    select: 'isIcon name sign type',
                    //model: "BrickType", (not necessary)
                    populate: {
                        path: "category", 
                        select: "color",
                        model: "Category"
                    }
                });
        return res.status(200).json(goals);

    } catch (error){
        return res.status(500).json(error);
    }
}

/// HERE in the count we can pass 1 or -1 if we want to INCREMENT or DECREMENT 
updateMarkedCount = (brickTypeId, count, callback) => {
    console.log("!!!!!!!!!!!!!!!!!!! HEY I AM IN GOAL SERVICE - updateMarkedCount !!!!!!!!!!!!!!!!!!!!!", brickTypeId);
    Goal.find({'conditions.brickType': brickTypeId})
        .then(goalsForUpdating => {

            for(let i = 0; i < goalsForUpdating.length; i++){
                console.log("!!!!!!!!!!!!!!!!!!! HEY I AM IN GOAL SERVICE - goalsForUpdating !!!!!!!!!!!!!!!!!!!!!", goalsForUpdating[i]);                
                var updateCond = { $inc: 
                    {
                        'conditions.$.markedCount': count
                    }
                }; 
                if (goalsForUpdating[i].markedCount + count >= goalsForUpdating[i].neededCount){
                    
                    updateCond.$set =
                    {
                        'status': 3
                    };
                }
                Goal.updateOne({
                    '_id': goalsForUpdating[i]._id,
                    'conditions.brickType': brickTypeId
                }, updateCond, callback);  
            }
        });
} 

module.exports = { 
    getGoalsByUser: getGoalsByUser,
    updateMarkedCount: updateMarkedCount
};

