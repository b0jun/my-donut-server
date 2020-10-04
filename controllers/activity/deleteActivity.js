const { Activity } = require(__base + "models");
// 생성한 유저에게만 권한, 요청을 보낸 사람이 액티비티의 주인인지 확인하는 것
module.exports = async (req, res) => {

  const { id } = req.params;

  let activity = await Activity.findOne({
    where:{
      id
    },
    attributes: { exclude: ['UserId']}
  });
    console.log('activity: ', activity);

  if(!activity){
    return res.status(404).json({
      message: "Invalid activity"
    });
  }
  
  console.log('user: ', req.user.id);
  if(req.user.id !== activity.ownerId){
    return res.status(403).json({
      message: "no permission"
    });
  }

  await activity.destroy({
    where: {
      id
  }});

  return res.status(204).json({
    message: "deleted successfully"
  });
    
};
