const { createHistory, appendHistory, getHistory } = require('../../../storage/chatRepository');

const botTag = "Midas#8805";
const baseFirstSystemMessage = {
  role: "system",
  content: `Seu nome é ${botTag} e você será nosso assistente!`,
};

module.exports = async (msgInstance, openAIClient, botId) => {
  const authorId = msgInstance.author.id;
  const messageContent = msgInstance.content;
  const channelId = msgInstance.channelId;
  const role = authorId != botId ? "user" : "assistant";
  let history = await getChatHistory(channelId);

  if (!history && authorId != botId) {
    await createChatMessageHistory(channelId, role, messageContent);
  }

  const messageToReply = await generateNextChatMessage(
    openAIClient,
    authorId,
    botId,
    messageContent,
    channelId
  );

  if (messageToReply) return msgInstance.channel.send(messageToReply);

  return;
};

const generateNextChatMessage = async (
  openAIClient,
  authorId,
  botId,
  prompt,
  channelId
) => {
  if (authorId != botId) {
    try {
      const history = await getChatHistory(channelId);
      await appendChatMessageToHistory("user", prompt, channelId);

      const response = await openAIClient.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: history,
      });

      const aiAnswer = response.data.choices[0].message?.content;

      return aiAnswer;
    } catch (error) {
      console.error("deu pau a req.", error);
    }
  } else {
    await appendChatMessageToHistory("assistant", prompt, channelId);
    return null;
  }
};

const createChatMessageHistory = async channelId => {
  const history = {
    channelId: channelId,
    history: [baseFirstSystemMessage]
  };

  await createHistory(history);
};

const appendChatMessageToHistory = async (role, prompt, channelId) => {
  const history = await getChatHistory(channelId);
  
  if(history) {
    const messageToAppend = {
      role: role,
      content: prompt,
    }
  
    if (history[history.length - 1] != messageToAppend) await appendHistory(channelId, messageToAppend);
  }
};

const getChatHistory = async channelId => await getHistory(channelId);
