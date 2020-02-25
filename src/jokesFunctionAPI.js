const axios = require('axios')

module.exports = (msg, bot) => {
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