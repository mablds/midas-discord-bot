module.exports = (msg, msgSent, youtube) => {
    let toSearch = mergeArgsMsgSent(msgSent);
    youtube.searchVideos(toSearch, 3)
        .then(resolve => {
            let toAnswer = ""
            let ind = 1
            resolve.forEach(el => {
                toAnswer += "**"+ind +". "+ el.title + "\n**" + "Descrição: " + el.description + "\n" + `https://www.youtube.com/watch?v=${el.id}` + "\n\n"
                ind++
            })
            msg.reply(toAnswer)
        })
        .catch(err => {
            console.log(err)
            msg.reply('Ih véi, deu ruim. Tenta de novo aí mas se permanecer me manda uma mensagem no privado.')
        })
}

module.exports.searchURL = async (msg, msgSent, youtube) => {
    let toSearch = mergeArgsMsgSent(msgSent);
    const videoSerached = await youtube.searchVideos(toSearch, 1);
    let toAnswer = `https://www.youtube.com/watch?v=${videoSerached[0].id}`;
    return await toAnswer;
}

const mergeArgsMsgSent = (msgSent) => {
    let toSearch = "";
    if(msgSent.length > 1){
        if(msgSent.length === 2){
            toSearch += msgSent[1];
        } else {
            for(let i = 1 ; i < msgSent.length; i++){
                if(i === 1){
                    toSearch += msgSent[1];
                } else {
                    toSearch += " " + msgSent[i];
                }
            }
        }
    }
    return toSearch;
}