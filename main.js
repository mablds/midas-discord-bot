require('dotenv').config()
const Eris = require('eris')
const YouTube = require('simple-youtube-api')

const youtube = new YouTube(process.env.YOUTUBE_API_KEY)
const bot = new Eris(process.env.DISCORD_TOKEN)

//Comand functions import
const helpFunction = require('./src/helpFunction');
const jokesFunction = require('./src/jokesFunctionAPI');
const youtubeAPI = require('./src/youtubeAPI');
const giphyAPI = require('./src/giphyAPI');
const playJoKenPo = require('./src/jokenpo')

//Bot listening to the new messages
bot.on("messageCreate", (msg) => {
    //set username and msgSent words array
    let sentUser = msg.author.username ? msg.author.username: msg.member.user.username;
    let msgSent = msg.content.split(" ");
    
    //bot command functions
    if(msgSent.length > 0){
        if(msgSent[0] === "!video") youtubeAPI(msg, msgSent, bot, youtube);
        if(msgSent[0] === "!gif") giphyAPI(msg, msgSent, bot)
    }
    if(msg.content === "!ping") bot.createMessage(msg.channel.id, "Pong!");
    if(msg.content === "!help") helpFunction(msg, bot, sentUser);
    if(msg.content === "!piada") jokesFunction(msg, bot);
})

bot.connect()