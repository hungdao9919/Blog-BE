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
    datecreated: {
        type:String,
        default:new Date().toLocaleString("vi-VN")
    },
    datemodify: {
        type:String,
        default:new Date().toLocaleString("vi-VN")
    },
    url: String,
    userid: String,
},{ timestamps: true });
const post = mongoose.model('post', schema);
module.exports = post;
