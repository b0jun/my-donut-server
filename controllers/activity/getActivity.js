const { Activity } = require(__base + "models");

/* 사용자가 activity를 클릭했을 때 */
module.exports = async (req, res) => {
  const activityId = req.params.id;
  
  let activity = await Activity.findOne({
    where: {
      id: activityId,
    },
    attributes: { exclude: ['UserId']}
  });
  console.log('get activity: ', activity);

  if(!activity){
    return res.status(404).json({
      "message": 'Invalid activity'
    });
  }

  const { name, intro, ownerId, participationCriteria, rule, numberOfPeople, location } = activity;

  res.status(201).json({
    name,
    intro,
    ownerId,
    participationCriteria,
    rule,
    numberOfPeople,
    location
  });
    
};
