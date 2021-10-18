require('dotenv').config();
const mongo = require('mongoose');

connectDB = () => {
    mongo.connect(process.env.MONGO_CONNECTION_URL, {
        // useNewUrlParser: true,
        // useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: true
    });

    // const connection = mongo.connection;
    // connection.once('open', () => {
    //     console.log('database connection established');
    // }).catch(err => {
    //     console.log('connection failed');
    // });

}

module.exports = connectDB;