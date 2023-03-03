const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const path = require('path');
const { logger } = require('./middleware/logger');

const connectDB = require('./config/dbConection');
connectDB();

const HTTPport = process.env.HTTPPORT;
const HTTPSport = process.env.HTTPSPORT;

app.use(logger);
app.use(express.json());
app.use('/', express.static(path.join(__dirname, '/public')));
app.use('/', require('./route/root'));
app.use('/register', require('./route/api/register'));
app.use('/login', require('./route/api/auth'));

app.use('/',require('./middleware/verifyJWT'))
app.use('/post', require('./route/api/post'));
 

app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', '404.html'));
});

mongoose.connection.once('open', async () => {
    console.log('Connected to Mongoose');
    app.listen(HTTPport, () => {
        console.log(`Server listening on port ${HTTPport}`);
    });

    app.listen(HTTPSport, () => {
        console.log(`Server listening on port ${HTTPSport}`);
    });
});
