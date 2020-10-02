const jwt = require('jsonwebtoken');
const crypto = require('crypto');
require('dotenv').config();

const { ACCESS_TOKEN_SECRET, REFRESH_TOEKN_SECRET } = process.env;
const [iteration, len, alg] = [100024, 64, 'sha512'];

//middlewares

exports.checkAccessToken = (apiType = 'resource') => {
    return (req, res, next) => {
        const header = req.headers['Authorization'];
    
        if(!header){
            return res.status(401).json({
                message: 'Access token does not exist'
            });
        }
    
        const token = header.split(' ')[1];
    
        jwt.verify(token, ACCESS_TOKEN_SECRET, (err, payload) => {
            if(err){
                console.log('error: ', err.name);
                if(apiType === 'resource' && err.name && err.name === 'TokenExpiredError'){
                    return res.status(403).json({
                        err: {
                            name: err.name,
                            tokenType: 'access_token',
                        }
                    });
                } else if(err.name && err.name === 'JsonWebTokenError'){
                    return res.status(400).json({
                        message: 'Incorrect access token'
                    });
                }
            }

            //console.log('verify: ', payload);
            if(!payload && apiType === 'refresh'){
                payload = jwt.decode(token);
            }
            
            req.user = payload;

            next();
        });
    };
}


//Helper

exports.generateToken = (type, payload) => {
    const { id, username, latlon, createdAt } = payload;

    if(type === 'access_token'){
        return jwt.sign({
            id, latlon, createdAt
        }, ACCESS_TOKEN_SECRET, { expiresIn: '1m'});
    } else if(type === 'refresh_token'){
        return jwt.sign({
            username, createdAt
        }, REFRESH_TOEKN_SECRET, { expiresIn: '2m'});
    }
}


exports.setPassword = (password) => {
    try{
        const buf = crypto.randomBytes(64);
        const salt = buf.toString('base64');
        const newPassword = crypto.pbkdf2Sync(password, salt, iteration, len, alg)
            .toString('base64');
        console.log('salt: ', salt);
            return [newPassword, salt];
    } catch(e){
        console.error(e);
    }
};

exports.checkPassword = (user, password) => {
    console.log('hash: ', password, '|||||||||||||||||||||||', user.salt);
    const hashedPassword = crypto.pbkdf2Sync(password, user.salt, iteration, len, alg)
     .toString('base64');
    //console.log('hashed: ', hashedPassword)
    return hashedPassword === user.password;
}

exports.getNeededUserInfo = user => {
    user = {
        email: user.email,
        username: user.username,
        address: user.address,
        latlon: user.latlon,
        createdAt: user.createdAt
    };
    return user;
}

exports.checkRefreshToken = (refreshToken) => {
    return jwt.verify(refreshToken, REFRESH_TOEKN_SECRET);
};