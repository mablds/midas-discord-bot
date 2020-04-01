module.exports = (guild, song, queue) => {
	const serverQueue = queue.get(guild.id);

	if (!song) {
        serverQueue.channel.leave();
		queue.delete(guild.id);
		return;
    }
    
    msg.channel.send(`🎶 Reproduzindo - ${song.title}`);

    const dispatcher = serverQueue.connection.play(ytdl(song))
    .on('end', () => {
        console.log('Music ended!');
        serverQueue.songs.shift();
        play(guild, serverQueue.songs[0]);
	})
    .on('error', error => {
		console.error(error);
    });
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
}