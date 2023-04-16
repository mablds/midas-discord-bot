# midas-discord-bot
Chat-bot integrated with OpenAI created to give some functionalities to my server's users. Code available to give a base about how to structure and how to use some APIs like discord.js, openai and mongoose.

## Usage
You can use Midas as it is by adding it to your own Discord's server. You can do this by using [this URL](https://discord.com/api/oauth2/authorize?client_id=622482772824424458&permissions=18975165643776&scope=bot) or pasting this on your browser:

```https://discord.com/api/oauth2/authorize?client_id=622482772824424458&permissions=18975165643776&scope=bot```

After this, you only need to follow the steps.

Or, you can use my code to create your new Bot with new functionalities or delete some of them. Feel free! If you want to do this, consider the `.env.example` file because it is extremely necessary to configure it before use.

To setup your `.env` file, follow this instructions:
- `cp .env.example .env`
- Create your Discord App Bot token to fill the `DISCORD_TOKEN` env var;
- Get your Discord Bot Application ID and fill the `BOT_ID` env var;
- Create an account and create a Token on OpenAI platform to fill the `OPEN_AI_TOKEN` env var;
- Create a MongoDB Database. I suggest to use AtlasDB. Theres a lot of tutorials teaching how to configure and setup your free DB instance. After configure it, you will be able to get a URI to fill your env var named `MONGO_URI`.

**Pull requests are welcome.**

## Functionalities
The commands was being structured using the "!" on the beggining. There only a few ones:
* !ping - I usually do this to test the connection of my bot.
* !image { arguments } - Uses OpenAI to generate some image with the arguments informed. Ex: `!image green pikachu`. 
  
## Resources
* [Discord.js](https://discordjs.guide/)
* [mongoose](https://mongoosejs.com/)
* [openai](https://github.com/openai/openai-node#readme)
