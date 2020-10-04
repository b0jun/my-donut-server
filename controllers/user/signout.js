const { User } = require(__base + 'models');

module.exports = async (req, res) => {

    const { authType } = req.cookies;

    if(authType === 'jwt'){

        let user = await User.update({ refreshToken: null },{
           where: {
                id: req.user.id,
           }
       });
    
       if(!user){
            return user.status(404).json({
                message: 'Invalid account'
            });
       }
    
       res.clearCookie('refreshToken');

    } else if(authType === 'oauth'){

        req.logout();

    }

   res.status(204).json({
       message: 'Logged out successfully'
    });
    
};  