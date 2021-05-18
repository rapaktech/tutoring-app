/* 
    1. Create a connection function for MongoDB.
    2. Start a local MongoDB connection
*/

const mongoose = require('mongoose');

require('dotenv').config();

const { MONGO_URI } = process.env;


// Async connection to db
const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
            useCreateIndex: true,
            useFindAndModify: false,
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Database Connection Is Successful');
    } catch (error) {
        console.error(err.message);
        
        // Exit with failure
        process.exit(1);
    }
}

module.exports = connectDB;