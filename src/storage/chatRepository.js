const chatHistory = require('./models/history');

module.exports.createHistory = async initialChatHistory => {
    try {
        await chatHistory.create(initialChatHistory);
    } catch (error) {
        console.error(error);
    }
}

module.exports.getHistory = async channelId => {
    try {
        const history = await chatHistory.find({ channelId: channelId });

        return history ? history[0].history : null;
    } catch (error) {
        console.error(error);
        return null;
    }
}

module.exports.appendHistory = async (channelId, chatMessage) => {
    try {
        const history = await chatHistory.find({ channelId: channelId });
        const messageHistoryToUpdate = [...history[0].history, chatMessage];
        await chatHistory.findOneAndUpdate(history[0]._id, { history: messageHistoryToUpdate });
    } catch (error) {
        console.error(error);
    }
}