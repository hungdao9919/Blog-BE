const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const connectDB = async () => {
    console.log("Bat dau ket noi")
    try {
        await mongoose.connect(process.env.DATABASE_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
    } catch (err) {
        console.log(err);
    }
    console.log("da ket noi")

};
module.exports = connectDB;
