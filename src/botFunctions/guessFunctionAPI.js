const axios = require('axios')

module.exports = (msg) => {
    axios.get(`https://us-central1-kivson.cloudfunctions.net/charada-aleatoria`)
        .then((response) => {
            const pergunta = response.data.pergunta
            const resposta = response.data.resposta
            msg.reply(" \n"+pergunta + "\n\nR: "+resposta)
        })
        .catch((error) => {
            console.log(error);
            msg.reply('Ih véi, deu ruim. Tenta de novo aí mas se permanecer me manda uma mensagem no privado.')
        })
}