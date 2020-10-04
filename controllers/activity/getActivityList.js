const geolib = require("geolib");

module.exports = async (req, res) => {
  const { Activity, User } = require(__base + "models");
console.log('-------------------------------');
  if(req.user.latlon){
      console.log('acitivity: ', req.user.latlon);
      const [latitude, longitude] = req.user.latlon.split(',');
    
      let activities = await Activity.findAll({
          attributes: { exclude: ['UserId']},
          include: [User]
      });
    
      let filtered = activities.filter(async (activity) => {
        
        //const owner = await User.findByPk(activity.ownerId);
        const owner = await activity.getUser();
        //console.log('owner: ', owner);
    
        if(owner.latlon){
            const [lat, lon] = owner.latlon.split(',');
        
            let dist = await geolib.getDistance(
                { latitude, longitude},
                {
                  latitude: lat,
                  longitude: lon,
                }
            );
            console.log('dist: ', dist);
            return dist < 60000;
        } 
    
        return false;
      });
      console.log(filtered);
      res.status(200).json(filtered);

  } else {
    let activities = await Activity.findAll({
        attributes: { exclude: ['UserId']},
    });
  
    res.status(200).json(activities);
  }

};