const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    postid: String,
    userid: String,
    commentcontent: {
        type: String,
        required: true,
    },
});
const comment = mongoose.model('comment', schema);
module.exports = comment;
