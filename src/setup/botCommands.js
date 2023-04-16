module.exports = {
    ping: require('../contexts/health/commands/ping'),
    chat:  require('../contexts/chatGPT/commands/chat'),
    images: require('../contexts/chatGPT/commands/images'),
}