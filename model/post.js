const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    postcontent: {
        type: String,
        required: true,
    },
    url: String,
    userid: String,
},{ timestamps: true });
const post = mongoose.model('post', schema);
module.exports = post;
