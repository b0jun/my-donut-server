const { User } = require(__base + 'models');
const { generateToken, checkPassword } = require(__base + 'lib/auth');

module.exports = async (req, res) => {
    const { email, password } = req.body;

    let user = await User.findOne({
        where: {
            email,
        }
    });

    if(!user){
        return res.status(404).json({
            message: "Email does not exist"
        });
    }
    
    if(!checkPassword(user, password)){
        return res.status(400).json({
            message: 'Password incorrect'
        });
    } 
    let accessToken;
    let refreshToken;
    try{
        accessToken = generateToken('access_token', user.dataValues);
        refreshToken = generateToken('refresh_token', user.dataValues);
        //console.log('refresh token:', refreshToken);
    } catch(e){
        console.error('Failed to generate token: ', e);
        return res.sendStatus(500);
    }
    
    user.refreshToken = refreshToken;
    user.save({ fields: ['refreshToken']});

    const { username, latlon } = user.dataValues;

    res.cookie('refreshToken', refreshToken, {
        httpOnly:true
    });
    res.status(200).json({
        accessToken,
        username,
        latlon
    });
};