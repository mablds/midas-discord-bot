const mongoose = require('mongoose');

module.exports = async (MONGO_URI) => {
    await mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    
    console.log('mongoose connected');

    return mongoose;
}