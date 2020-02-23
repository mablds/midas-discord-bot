const randomNumber = require('../randomNumber');
const giphyApiKey = process.env.GIPHY_API_KEY;
const axios = require('axios')

module.exports = function(msg, msgSent, bot){
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