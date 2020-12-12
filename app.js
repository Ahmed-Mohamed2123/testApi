const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const userRouter = require('./routes/userRoutes');

const app = express();
app.use(cors());
// Middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Routes
app.use('/api/user', userRouter);

module.exports = app;

// passwordHeruko = Samah2123@