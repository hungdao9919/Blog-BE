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
    postimage: {
        type: String,
        required: true,
        default: "https://res.cloudinary.com/dr9qxrwxx/image/upload/v1684598080/Untitled-design-50_uhle3q.png"
    },
    url: String,
    userid: String,
},{ timestamps: true });
schema.index({title: 'text', postcontent: 'text'});
const post = mongoose.model('post', schema);
module.exports = post;
