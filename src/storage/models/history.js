const { mongoose, Schema } = require('mongoose');

const chatHistory = new Schema({
    channelId: String,
    history: []
});

module.exports = mongoose.model("chatHistory", chatHistory);
