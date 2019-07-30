
const Goal = require('./../models/goal');
const _ = require('underscore');

getGoalsByUserAndStatus = async (req, res, next) => {

    var userId = req.params.userId;
    var status = req.params.status;

    console.log("GETTING GOALS BY ", status);
    if (!userId){
        return res.status(500).json({ error: 'User is not found'});
    }
    try {
        const goals = await Goal.find({'user': userId, 'status': status})
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

getMyGoalsCount = async (req, res, next) => {

    var userId = req.params.userId;
    var status = req.params.status;

    console.log("We are in getting goals COUNT", userId, status);

    if (!userId){
        return res.status(500).json({ error: 'User is not found'});
    }
    try {
        const goalsCount = await Goal.find({'user': userId, 'status': status})
           .count();
        return res.status(200).json(goalsCount);

    } catch (error){
        return res.status(500).json(error);
    }
}

getGoalById = async (req, res, next) => {
    console.log("We are in getGoalById");
    var goalId = req.params.goalId;
    if (!goalId){
        return res.status(500).json({ error: 'Goal is not found'});
    }
    try {
        const goals = await Goal.findOne({'_id': goalId})
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

    // Update Goals (active goals), with conditions of current BrickType
    Goal.find({'conditions.brickType': brickTypeId, status: 1})
        .then(goalsForUpdating => {

          for (let i = 0; i < goalsForUpdating.length; i++) {
            console.log("!!!!!!!!!!!!!!!!!!! HEY I AM IN GOAL SERVICE - goalsForUpdating !!!!!!!!!!!!!!!!!!!!!" + goalsForUpdating[i]);

            var condition = _.find(goalsForUpdating[i].conditions, (cond) => cond.brickType.equals(brickTypeId));

            console.log('Current Condition is - ', condition);

            if (condition.markedCount >= condition.neededCount) continue;
            else {
                console.log('LETS TRY TO UPDATE CONDITION COUNT')
                var updateCond = {
                  $inc:
                  {
                    'conditions.$.markedCount': count
                  }
                };

                // Need to check here if other conditions is finished.
                condition.markedCount++;
                if (_.every(goalsForUpdating[i].conditions, (cond) => cond.markedCount >= cond.neededCount)){
                  //if (condition.markedCount + count >= condition.neededCount) {
                  console.log('YEAH - WE NEED to set status 3 (success) for current goal');
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
          }
          //callback();
        });
}

deleteGoal = async (req, res) => {
    var goalId = req.params.goalId;

    console.log("ИЩЕМ ЦЕЛЬ Э" , goalId);

    try{
        await Goal.findOne({'_id': goalId})
            .then(goal =>{
                if (goal){
                    console.log("УДАЛЯЕМ ЦЕЛЬ Э" , goal._id);
                    Goal.updateOne({'_id': goal._id},
                        {$set: {
                            'status': 2
                        }},
                        () => res.status(200).json(true));
                } else {
                    return res.status(500).json("Ну удалось найти цель")
                }
            });
    } catch (error) {
        return res.status(500).json(error);
    }
    // Goal.updateOne({'_id': goalId},
    //             {$set: {
    //                 'status': 2
    //             }},
    //             res.status(200).json(true));
}

module.exports = {
    getGoalsByUserAndStatus: getGoalsByUserAndStatus,
    getMyGoalsCount: getMyGoalsCount,
    updateMarkedCount: updateMarkedCount,
    getGoalById: getGoalById,
    deleteGoal: deleteGoal
};

