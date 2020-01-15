exports.run = async (client, msg) => {
    if(msg.author.id === client.id) return;

    if(msg.system) return;

    let guild = await client.settings.findOne({ where: { _id: msg.guild.id } });

    if(guild.deletemsg === false || guild.deletedmsg === undefined) return;

    if(guild.logs === '' || guild.logs === undefined) return;

    if(guild.ignoredchan.includes(guild.logs)) return;

    if(guild.deletedmsg === true && guild.logsEn === true) {
        if(msg.guild.channels.get(guild.logs) != undefined || guild.logs != '') {
            const embed = new Discord.MessageEmbed();
            embed.setAuthor(`${msg.author.tag}`, msg.author.displayAvatarURL() || 'https://discordapp.com/assets/6debd47ed13483642cf09e832ed0bc1b.png')
            embed.setTitle(`Message deleted in #${msg.channel.name}`)
            embed.setDescription(msg.content);
            embed.setFooter(`ID: ${msg.id}`)
            embed.setTimestamp()
            embed.setColor(0xCA3333);
            return msg.guild.channels.get(guild.logs).send({embed});
        }
    }

}