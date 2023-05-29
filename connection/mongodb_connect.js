// require('dotenv').config({path: `config/.env.${process.env.NODE_ENV}`});
require('dotenv').config({ path: `config/.env.development` });
const mongoose = require('mongoose');
const { loggers } = require('winston');
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("connected Succefully")
    } catch (error) {
        loggers.warn(`Error: ${error.message}`)
        process.exit(1)

    }
}

module.exports = connectDB