const { Activity } = require(__base + "models");

module.exports = async (req, res) => {
  const { Activity } = require(__base + "models");

  let activity = await Activity.create({
    name: req.body.name,
    intro: req.body.intro,
    ownerId: req.user.id,
    participationCriteria: req.body.participationCriteria,
    rule: req.body.rule,
    numberOfPeople: req.body.numberOfPeople,
    location: req.body.location,
  });


  if (!activity) {
    return res.status(403).json({ message: "It's fail to store" });
  } else {
    return res
      .status(201)
      .json({ 
        message: "It's completed to store Successfully",
        username: req.user.username,
        activityId: activity.id
      });
  }
};

// const { Activity } = require(__base + "models"); 를 전역으로 빼서 사용해주세요. 운영체제? 문제
