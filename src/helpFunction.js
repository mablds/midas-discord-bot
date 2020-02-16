module.exports = function helpFunc(msg, bot, sentUser) {
    bot.createMessage(
        msg.channel.id, `**.\n       Olá humanos, olá ${sentUser}.** \n
        Estou sendo desenvolvido ainda, mas já tenho meu valor. Tente dar comandos utilizando "!" no começo assim como fizeram para dar o comando help.\n
        **------------------------Tente:------------------------\n**
        __!ping__
        __!piada__
        __!video__ <busca> (pode alterar o parametro após o comando)
        __!gif__ <busca> (pode alterar o parametro após o comando)
        
        Qualquer problema, mande mensagem inbox ao eggzera ou auxilie: Pulls requests são bem vindos.
        **--------------------------------------------------------**\n
        Github: https://github.com/mablds/midas-discord-bot
        LinkedIn: https://www.linkedin.com/in/marcelo-arthur-701929175/
        Email: marcelobragalemos@gmail.com`
    );
}