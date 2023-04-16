const { Client, GatewayIntentBits } = require('discord.js');

module.exports = () => {
    return new Client({ 
        intents: [
            GatewayIntentBits.Guilds, 
            GatewayIntentBits.DirectMessages, 
            GatewayIntentBits.GuildMessages, 
            GatewayIntentBits.MessageContent
        ]
    });
}