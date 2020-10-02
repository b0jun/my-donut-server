const { User } = require(__base + 'models');
const { generateToken, checkRefreshToken } = require(__base + 'lib/auth');

module.exports = async (req, res) => {

    const { refreshToken } = req.cookies;

    if(!refreshToken){
        return res.status(401).json({
            message: 'Refresh token does not exist'
        });
    }

    let user = await User.findOne({
        where: {
            id: req.user.id,
            refreshToken
        }
    });

    if(!user){
        return res.status(404).json({
            message: 'Invalid account or Invalid refresh token'
        });
    }

    //refresh token 검증(+유효 기간 검증)
    try{
        checkRefreshToken(refreshToken);
    } catch(e){
        console.error('failed to check refresh token', e);

        if(e.name && e.name === 'TokenExpiredError'){
            return res.status(403).json({
                err: {
                    name: e.name,
                    tokenType: 'refresh_token',
                }
            })
        } else {
            return res.status(400).json({
                message: 'Incorrect refresh token'
            });
        }
    }

    const accessToken = generateToken('access_token', user.dataValues);

    res.status(200).json({
        accessToken
    });    
}