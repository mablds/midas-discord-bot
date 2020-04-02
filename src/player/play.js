const ytdl = require('ytdl-core');

module.exports = (msg, guild, song, queue) => {
  const serverQueue = queue.get(msg.guild.id);
	if (!song) {
        serverQueue.channel.leave();
		queue.delete(guild.id);
		return;
    }
    
    msg.channel.send(`🎶 Reproduzindo - ${song.title}`);

    console.log(serverQueue.songs)
    const dispatcher = serverQueue.connection.play(ytdl(song.url))
    .on('finish', () => {
        console.log('Music ended!');
        serverQueue.songs.shift();
        play(msg, guild, serverQueue.songs[0], serverQueue);
	})
    .on('error', error => {
		console.error(error);
    });
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
}