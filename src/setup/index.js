require('dotenv').config();

const botCommands = require('./botCommands');

const discordClient = require('./discordClient');
const openAIClient = require('./openAIClient');
const mongoDBClient = require('./mongodbClient');

module.exports = {
    discordClient: discordClient(),
    openAIClient: openAIClient(process.env.OPEN_AI_TOKEN),
    mongoDBClient: mongoDBClient(process.env.MONGO_URI),
    commands: botCommands,
    envVars: process.env
}
