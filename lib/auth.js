const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { User } = require(__base + 'models');

require('dotenv').config();

const { ACCESS_TOKEN_SECRET, REFRESH_TOEKN_SECRET } = process.env;
const [iteration, len, alg] = [100024, 64, 'sha512'];

//middlewares

const checkJWT = (req, res, next) => {
  const header = req.headers['authorization'];
  console.log('header: ', header, req.headers);

  if (!header) {
    return res.status(401).json({
      message: 'Access token does not exist',
    });
  }
  const token = header.split(' ')[1];
  const isRefresh = req.path === '/refresh';
  console.log('is refresh: ', req.path, isRefresh)

  jwt.verify(token, ACCESS_TOKEN_SECRET, async (err, payload) => {
    if (err) {
      console.log('error: ', err.name);
      if (!isRefresh && err.name && err.name === 'TokenExpiredError') {
        return res.status(403).json({
          err: {
            name: err.name,
            tokenType: 'access_token',
          },
        });
      } else if (err.name && err.name === 'JsonWebTokenError') {
        return res.status(400).json({
          message: 'Incorrect access token',
        });
      }
    }
    //console.log('verify: ', payload);
    if (!payload && isRefresh) {
      payload = jwt.decode(token);
    }

    console.log('playload', payload);
    let user = await User.findByPk(payload.id);

    if(!user){
      return res.status(400).json({
        message: "Invalid account"
      });
    } 

    req.user = user;

    console.log('check: ', req.user);
    next();
  });
};

const checkOauth = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({
      message: 'Invalid session',
    });
  }

  console.log('oauth check');
  next();
};

exports.authMiddleware = (req, res, next) => {
  const { authType } = req.cookies;
  console.log('auth type, cookies: ', authType, req.cookies);
  if (authType === 'jwt') {
    return checkJWT(req, res, next);
  } else if (authType === 'oauth') {
    return checkOauth(req, res, next);
  }
};

//Helper

exports.generateToken = (type, payload) => {
  const { id, username, latlon, createdAt } = payload;

  if (type === 'access_token') {
    return jwt.sign(
      {
        id,
        latlon,
        createdAt,
      },
      ACCESS_TOKEN_SECRET,
      { expiresIn: '1h' }
    );
  } else if (type === 'refresh_token') {
    return jwt.sign(
      {
        username,
        createdAt,
      },
      REFRESH_TOEKN_SECRET,
      { expiresIn: '7d' }
    );
  }
};

exports.setPassword = (password) => {
  try {
    const buf = crypto.randomBytes(64);
    const salt = buf.toString('base64');
    const newPassword = crypto
      .pbkdf2Sync(password, salt, iteration, len, alg)
      .toString('base64');
    console.log('salt: ', salt);
    return [newPassword, salt];
  } catch (e) {
    console.log(e);
  }
};

exports.checkPassword = (user, password) => {
  console.log('hash: ', password, '|||||||||||||||||||||||', user.salt);
  const hashedPassword = crypto
    .pbkdf2Sync(password, user.salt, iteration, len, alg)
    .toString('base64');
  console.log('hashed: ', hashedPassword, '||||||||||||||||||||', user.password);
  return hashedPassword === user.password;
};

exports.getNeededUserInfo = (user) => {
  user = {
    email: user.email,
    username: user.username,
    githubId: user.githubId,
    latlon: user.latlon,
    createdAt: user.createdAt,
  };
  return user;
};

exports.checkRefreshToken = (refreshToken) => {
  return jwt.verify(refreshToken, REFRESH_TOEKN_SECRET);
};
