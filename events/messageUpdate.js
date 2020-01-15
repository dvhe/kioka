exports.run = async (client, old, _new) => {
    if(old.author.id === client.id) return;
    if(_new.author.id === client.id) return;

    let guild = await client.settings.findOne({ where: { _id: old.guild.id } });

    if(guild.editedmsgs === false || guild.editedmsgs === undefined) return;

    if(guild.logs === '' || guild.logs=== undefined) return;

    if(guild.ignoredchan.includes(guild.logs)) return;

    if(_new.edits.length < 1 || _new.content === old.content) return;

    if(guild.editedmsgs === true && guild.logsEn === true) {
        if(client.channels.get(guild.logs) != undefined || guild.logs != '') {
            const embed = new Discord.MessageEmbed();
            embed.setAuthor(`${old.author.tag}`, old.author.displayAvatarURL() || 'https://discordapp.com/assets/6debd47ed13483642cf09e832ed0bc1b.png')
            embed.setTitle(`Message edited in #${old.channel.name}`)
            embed.setDescription(`**Before:** ${old.content}\n**After:** ${_new.content}`);
            embed.setFooter(`ID: ${old.id}`)
            embed.setTimestamp()
            embed.setColor(0x7D65BF);
            return client.channels.get(guild.logs).send({embed});
        }
    }
}