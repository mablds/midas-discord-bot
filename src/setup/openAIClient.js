const { Configuration, OpenAIApi } = require("openai");

module.exports = token => new OpenAIApi(new Configuration({ apiKey: token }));