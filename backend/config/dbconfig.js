const mongoose = require('mongoose');

mongoose.connect(process.env.mongo_url);

const connection = mongoose.connection;

connection.on('error', () => {
    console.log('MongoDB connection failed');
});

connection.on('connected',()=>
{
    console.log('Portfolio database connection successful');
});
module.exports = connection;