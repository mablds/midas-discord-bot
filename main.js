const Eris = require('eris')
const axios = require('axios')
const YouTube = require('simple-youtube-api')
require('dotenv').config()

const youtube = new YouTube(process.env.YOUTUBE_API_KEY)
const bot = new Eris(process.env.DISCORD_TOKEN)

const giphyApiKey = process.env.GIPHY_API_KEY;

bot.on("ready", () => {
    console.log("Ready!");
});

bot.on("messageCreate", (msg) => {
    //set username that triggered this arrow function
    const sentUser = msg.member.user.username ? msg.member.user.username : msg.author.username
    const msgSent = msg.content.split(" ")
    
    //commands
    if(msg.content === "!help"){
        bot.createMessage(msg.channel.id, `**.\n       Olá humanos, olá ${sentUser}.** \n
        Tô sendo desenvolvido ainda, mas já tenho meu valor. Tente dar comandos utilizando "!" no começo assim como fizeram para dar o comando help.\n
        **------------------------Tente:------------------------\n**
        __!ping__
        __!piada__
        __!video__ <busca> (pode alterar o parametro após o comando)
        __!gif__ <busca> (pode alterar o parametro após o comando)
        
        Qualquer problema, mande mensagem inbox ao eggzera ou auxilie: Pulls requests são bem vindos.
        **--------------------------------------------------------**\n
        Github: https://github.com/mablds/midas-discord-bot
        LinkedIn: https://www.linkedin.com/in/marcelo-arthur-701929175/
        Email: marcelobragalemos@gmail.com`);
    }

    if(msg.content === "!ping") { 
        bot.createMessage(msg.channel.id, "Pong!");
    }

    if(msg.content === "!piada"){
        axios.get(`https://us-central1-kivson.cloudfunctions.net/charada-aleatoria`)
        .then((response) => {
            const pergunta = response.data.pergunta
            const resposta = response.data.resposta
            bot.createMessage(msg.channel.id, " \n"+pergunta + "\n\nR: "+resposta)
        })
        .catch((error) => {
            console.log(error);
            bot.createMessage(msg.channel.id,'Ih véi, deu ruim. Tenta de novo aí mas se permanecer me manda uma mensagem no privado.')
        })
    }

    if(msgSent[0] === "!video") { 
        let toSearch = ""
        if(msgSent.length > 1){
            msgSent.shift()
            msgSent.forEach(el => {
                toSearch += " "+el
            })
        }
        youtube.searchVideos(toSearch, 3)
            .then(resolve => {
                let toAnswer = ""
                let ind = 1
                resolve.forEach(el => {
                    toAnswer += "**"+ind +". "+ el.title + "\n**" + "Descrição: " + el.description + "\n" + `https://www.youtube.com/watch?v=${el.id}` + "\n\n"
                    ind++
                })
                bot.createMessage(msg.channel.id, toAnswer)
            })
            .catch(err => {
                console.log(err)
                bot.createMessage(msg.channel.id,'Ih véi, deu ruim. Tenta de novo aí mas se permanecer me manda uma mensagem no privado.')
            })

    }
    
    if(msgSent[0] === "!gif"){
        const randomNumber = require('./randomNumber');
        const userSent = msg.author.username
        let toSearch = ""
        if(msgSent.length > 1){
            msgSent.shift()
            msgSent.forEach(el => {
                if(toSearch === ""){
                    toSearch += el
                } else {
                    toSearch += "+"+el
                }
            })
            getGif(toSearch)
            function getGif (toSearch) {
                axios.get(`http://api.giphy.com/v1/gifs/search?q=${toSearch}&api_key=${giphyApiKey}&limit=100`)
                    .then((response) => {
                        const numberGenerated = randomNumber.randomNumber();
                        bot.createMessage(msg.channel.id, response.data.data[numberGenerated].url)
                    })
                    .catch((error) => {
                        console.log(error);
                        bot.createMessage(msg.channel.id,'Ih véi, deu ruim. Tenta de novo aí mas se permanecer me manda uma mensagem no privado.')
                    })
            }
        } else {
            bot.createMessage(msg.channel.id, "Insira um assunto para buscar Gifs específicos!")
        }
    }
})
bot.connect()