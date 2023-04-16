const { discordClient, openAIClient, commands, envVars, mongoDBClient } = require('./src/setup/index');

discordClient.on('ready', () => console.log(`Logged in as ${discordClient.user.tag}!`));

discordClient.on('messageCreate', async msgInstance => {
    //commands
    if (msgInstance.content.includes('!ping')) return commands.ping(msgInstance);
    if (msgInstance.content.includes('!image')) return commands.images(msgInstance, openAIClient);
    //default chat
    if (msgInstance.content) return await commands.chat(msgInstance, openAIClient, envVars.BOT_ID);
});

discordClient.login(envVars.DISCORD_TOKEN);