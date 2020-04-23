const randomNumber = require('./randomNumber');
const giphyApiKey = process.env.GIPHY_API_KEY;
const axios = require('axios')

module.exports = (msg, msgSent, bot) => {
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
                    const numberGenerated = randomNumber(response.data.data.length);
                    msg.reply(response.data.data[numberGenerated].url)
                })
                .catch((error) => {
                    console.log(error);
                    msg.reply('Ih véi, deu ruim. Tenta de novo aí mas se permanecer me manda uma mensagem no privado.')
                })
        }
    } else {
        msg.reply("Insira um assunto para buscar Gifs específicos!")
    }
}