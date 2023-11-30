const mongoose = require("mongoose");

async function connectDb() {
    try {
        mongoose.set('strictQuery', false);
        mongoose.connect(process.env.MONGO_URI);

    } catch (error) {


        process.exit(1);
    }
}
module.exports = connectDb;
