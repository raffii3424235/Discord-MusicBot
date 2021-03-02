const { MessageEmbed } = require("discord.js");
const sendError = require("../util/error");

module.exports = {
  info: {
    name: "pause",
    description: "Menghentikan Lagu Yang Sedang Di Putar",
    usage: "[pause]",
    aliases: ["pause"],
  },

  run: async function (client, message, args) {
    const serverQueue = message.client.queue.get(message.guild.id);
    if (serverQueue && serverQueue.playing) {
      serverQueue.playing = false;
	    try{
      serverQueue.connection.dispatcher.pause()
	  } catch (error) {
        message.client.queue.delete(message.guild.id);
        return sendError(`:note: Lagu telah di hentikan dan antrian telah di hapus.: ${error}`, message.channel);
      }	    
      let xd = new MessageEmbed()
      .setDescription("⏸ Paused the music!")
      .setColor("YELLOW")
      .setTitle("Music has been paused!")
      return message.channel.send(xd);
    }
    return sendError("Tidak ada musik yang di putar.", message.channel);
  },
};
