const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const DBURI = process.env.DBURI;
        await mongoose.connect(DBURI);
        console.log("Database Connected and Running Suceessfully");
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}

module.exports = connectDB;