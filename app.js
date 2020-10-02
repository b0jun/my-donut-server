global.__base = __dirname + '/';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const { userRouter } = require('./routes');

const app = express();
const port = 4000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:true,
    credentials:true
}));
app.use(morgan());

app.use('/user', userRouter);
app.use('/', (req, res) => res.send('success'));

app.listen(port, () => {
    console.log(`listening port ${port}`);
})