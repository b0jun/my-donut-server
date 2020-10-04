const { Activity } = require(__base + "models");

/*
  지원하기 버튼을 눌렀을 때 DB에 저장해야 한다.
  해당 데이터를 activityParticipant에 저장해야 한다.
*/

module.exports = async (req, res) => {
  /* ActivityParticipants에 저장한다. */
  const { id } = req.params;

  let activity = await Activity.findOne({
    where: {
      id
    },
    attributes: { exclude: ['UserId'] }
  });

  if(!activity){
    return res.status(404).json({
      message: "Invalid activity"
    });
  }
  
  await activity.addUsers([req.user.id]);
  console.log('acitivity users: ', await activity.getUsers());

  res.status(200).json({
    message: "joined successfullt"
  });
};
