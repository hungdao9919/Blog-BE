const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    postid: String,
    userid: String,
    commentcontent: {
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
    
},{ timestamps: true });
const comment = mongoose.model('comment', schema);
module.exports = comment;
