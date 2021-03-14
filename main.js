const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '.env') });
const Discord = require('discord.js')
const YouTube = require('simple-youtube-api')

const youtube = new YouTube(process.env.YOUTUBE_API_KEY)
const bot = new Discord.Client()

//Comand functions import
const helpFunction = require('./src/botFunctions/helpFunction');
const musicFunction = require('./src/botFunctions/musicFunction');
const guessFunction = require('./src/botFunctions/guessFunctionAPI');
const youtubeAPI = require('./src/botFunctions/youtubeAPI');
const giphyAPI = require('./src/botFunctions/giphyAPI');

//initializer bot
bot.on('ready', () => console.log(`Logged in as ${bot.user.tag}!`));

//Bot listening to the new messages
bot.on("message", msg => {
    let sentUser = msg.author.username ? msg.author.username: msg.member.user.username;
    let msgSent = msg.content.split(" "); //set username and msgSent words array
    
    //bot command functions
    if(msgSent.length > 0){
        if(msgSent[0] === "!video") youtubeAPI(msg, msgSent, youtube);
        if(msgSent[0] === "!gif") giphyAPI(msg, msgSent);
        //if(msgSent[0] === "!play") musicFunction.execute(msg, msgSent, youtube);
    }
    if(msg.content === "!help") helpFunction(msg, sentUser);
    if(msg.content === "!charada") () => msg.reply("Temporariamente fora do ar!");
    if(msg.content === "!ping") msg.reply("Pong!");
})

bot.login(process.env.DISCORD_TOKEN)
