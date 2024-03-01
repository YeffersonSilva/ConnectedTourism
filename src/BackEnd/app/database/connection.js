const mongoose = require('mongoose');

const connection = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/DbConnectedTourism')
        console.log('Connected to database');
    } catch (error) {
        console.error('Error connecting to database', error);
    }
}
    
module.exports = connection;