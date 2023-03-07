const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const path = require('path');
const { logger } = require('./middleware/logger');
const cookieParser = require('cookie-parser')

const connectDB = require('./config/dbConection');
connectDB();

const HTTPport = process.env.HTTPPORT;
const HTTPSport = process.env.HTTPSPORT;

app.use(logger);
app.use(cookieParser())
app.use(express.json());
app.use('/', express.static(path.join(__dirname, '/public')));
app.use('/', require('./route/root'));
app.use('/login', require('./route/api/auth'));
app.use('/register', require('./route/api/registerUser'));

app.use('/refresh', require('./route/api/refresh'));
app.use('/public-posts', require('./route/api/publicPosts'));
app.use('/public-comments', require('./route/api/publicComment'));

app.use('/',require('./middleware/verifyJWT'))
app.use('/admin-comment', require('./route/adminApi/commentsAdmin'));
app.use('/admin-post', require('./route/adminApi/postsAdmin'));
app.use('/user', require('./route/api/user'));
app.use('/post', require('./route/api/post'));
app.use('/comment', require('./route/api/comment'));
 

app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', '404.html'));
});

mongoose.connection.once('open', async () => {
    console.log('Connected to MongoDB');
    app.listen(HTTPport, () => {
        console.log(`Server listening on port ${HTTPport}`);
    });

    app.listen(HTTPSport, () => {
        console.log(`Server listening on port ${HTTPSport}`);
    });
});
