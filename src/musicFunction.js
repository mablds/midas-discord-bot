const ytdl = require('ytdl-core');
const youtubeFunction = require('./youtubeAPI');
const play = require('./player/play');
const queue = require('./player/queue');

module.exports.execute = async (msg, msgSent, youtube) => {
    const url = await youtubeFunction.searchURL(msg, msgSent, youtube)
    const serverQueue = queue.get(msg.guild.id);
    const songInfo = await ytdl.getInfo(url);

    const song = {
        title: songInfo.title,
        url: songInfo.video_url,
    };
    
    let { channel } = msg.member.voice;
    if (!channel) return msg.channel.send('Você precisa estar em algum canal de voz para realizar este comando.');
    const permissions = channel.permissionsFor(msg.client.user);
    if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
        return msg.channel.send('Eu preciso de mais permissões para entrar/falar no canal.');
    }
    
    if (!serverQueue) {
        const queueContruct = {
			textChannel: msg.channel,
			voiceChannel: channel,
			connection: null,
			songs: [],
			volume: 5,
			playing: true,
		};
        try {
            var connection = await channel.join();
            queueContruct.songs.push(song);
			queueContruct.connection = connection;
            queue.set(msg.guild.id, queueContruct);
			play(msg, msg.guild, song, queue, serverQueue, connection);
		} catch (err) {
            console.log(err);
			queue.delete(msg.guild.id);
			return msg.channel.send(err);
		}
    }
}