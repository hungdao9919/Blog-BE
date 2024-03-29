const mongoose = require('mongoose');
 const schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        
    },
    profileImage: {
        type: String,
        required: true,
        default: "https://res.cloudinary.com/dr9qxrwxx/image/upload/v1684597709/images_vqkeyr.png"
    },
    refreshToken: String,
    roles: {
        User: {
            type: Number,
            default: 2001,
        },
        Editor: Number,
        Admin: Number,
    },
    email: String,
    firstname: String,
    lastname: String,
},{ timestamps: true });
const user = mongoose.model('user', schema);
module.exports = user;
