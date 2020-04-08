const ytdl = require('ytdl-core');
let playing = false;

module.exports = (msg, guild, song, queue, serverQueue, connection) => {
  let { channel } = msg.member.voice;

	if (!song) {
    serverQueue.channel.leave();
		queue.delete(guild.id);
		return;
  }

  if(!playing) {
    msg.channel.send(`🎶 Reproduzindo - ${song.title}`);
    playing = true;
    const dispatcher = serverQueue.connection.play(ytdl(song.url))
    .on('finish', () => {
      console.log('Music ended!');
      serverQueue.songs.shift();
      if(serverQueue.songs.length > 1) {
          msg.channel.send(`🎶 Reproduzindo - ${serverQueue.songs[0].title}`);
          serverQueue.connection.play(ytdl(serverQueue.songs[0].url))
        } else {
          playing = false;
          channel.leave();
        }
      })
      .on('error', error => {
        playing = false;
        channel.leave();
        console.error(error);
      });
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
  } else {
    serverQueue.songs.push(song);
    return msg.channel.send(`🎶 ${song.title} foi adicionado a fila.`);
  }
}