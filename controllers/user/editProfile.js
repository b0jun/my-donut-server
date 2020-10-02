const { User } = require(__base + 'models');

module.exports = async (req, res) => {
  
    const userData = {
    ...req.body
  };

  if(userData.email){
      delete userData.email;
  }

  let user = await User.update({ ...userData }, {
      where: {
        id: req.user.id,
      }
  });

  if(!user){
      return res.status(404).json({
        message:'Invalid account'
    });
  }

  res.status(204).json({
    message: 'Profile edited successfully'
  });

};