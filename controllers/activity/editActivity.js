const { Activity } = require(__base + 'models');

module.exports = async (req, res) => {
  const { id } = req.params;
  let activity = await Activity.findOne({
    where: {
      id
    },
    attributes: { exclude: ['UserId']}
  });

  if(!activity){
    return res.status(404).json({
      message: "Invalid activity"
    });
  }

  if(req.user.id !== activity.ownerId){
    return res.status(403).json({
      message: "no permission"
    });
  }

  let fields = [];
  for(let key in req.body){

    if(key !== 'createdAt' || key !== 'updatedAt'){
      activity[key] = req.body[key];
      fields.push(key);
    }

  }  
  console.log('edit: ', fields, activity);
  await activity.save({
    fields: fields
  });

  console.log('activity: ', activity);

  res.status(200).json({
    ...req.body
  });

};
