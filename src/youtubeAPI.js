module.exports = function youtubeAPI(msg, msgSent, bot, youtube){
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