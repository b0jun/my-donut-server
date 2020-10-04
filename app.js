global.__base = __dirname + '/';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const { userRouter, activityRouter } = require('./routes');
const { authMiddleware } = require(__base + 'lib/auth');
const passport = require(__base + 'lib/passport');

const app = express();
const port = 4000;

require('dotenv').config();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialize: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(morgan());

app.use('/user', userRouter);
app.use('/activity', authMiddleware, activityRouter);

app.listen(port, () => {
  console.log(`listening port ${port}`);
});
