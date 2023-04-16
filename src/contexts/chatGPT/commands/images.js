const getFormattedArguments = require('../../../shared/formatArgs');

module.exports = async (msgInstance, openAIClient) => {
    const argumentPrompt = getFormattedArguments("!image", msgInstance.content);

    if (argumentPrompt) {
      const response = await openAIClient.createImage({
        prompt: argumentPrompt,
        n: 1,
        size: "1024x1024",
      });
    
      return msgInstance.channel.send(response.data.data[0].url);
    }
    
    console.error(msgInstance.content, 'hasnt enough arguments');
  }