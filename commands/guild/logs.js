const Command = require('../../structures/Command.js');
const beautify = require('json-beautify');

module.exports = class Logs extends Command {
    constructor(client) {
        super();
        this.name = 'logs';
        this.aliases = [];
        this.description = 'Set a log channel for all events.';
        this.usage = '<>';
        this.cooldown = 0;
        this.hidden = false;
        this.guildOnly = false;
        this.botPerms = [];
        this.client = client;
    }

    async run(msg, args) {

    if(!args[0]) {
        const embed = new Discord.MessageEmbed()
        .setAuthor(`${msg.author.tag}`, msg.author.displayAvatarURL() || 'https://quak.ovh/5uCcVKm.png')
        .setDescription('<:xmark:627257276046114856> No arguments were provided. \`<toggle> || <channel>\`')
        .setColor(0xE54846)
        return msg.channel.send({embed});
    }

    let guild = await this.client.settings.findOne({where: { _id: msg.guild.id } });

    if(guild.modRoleEn === true && !msg.member.roles.has(guild.modRole) || !msg.guild.member(msg.author).permissions.has('MANAGE_SERVER') || !msg.guild.member(msg.author).permissions.has('ADMINISTRATOR') || !msg.member.id === msg.guild.owner.id) {
        return msg.channel.send('You are unable to use this command due to lacking permission.');
    }

    //if(guild.modRoleEn === true && !msg.member.roles.has(guild.modRole) || !msg.guild.member(msg.author).permissions.has('MANAGE_SERVER') || !config.discord.owners.includes(msg.author.id) || msg.guild.owner.id != msg.author.id) {

    if(/toggle/.test(args[0])) {
        if(guild.logsEn === true) {
            await this.client.settings.update({ logsEn: false },  { where: { _id: msg.guild.id } });
            return msg.buildEmbed(`Events will no longer be logged.`, {color: 'red', name: 'hello' });
        }
        if(guild.logsEn === false) {
            await this.client.settings.update({ logsEn: true },  { where: { _id: msg.guild.id } });
            return msg.buildEmbed(`Events will now be logged in the channel you set.`, {color: 'blue'});
        }
    }

    let chan = msg.content.split(' ').splice(2, 2);
       if(/channel/.test(args[0])) {
           if(!msg.guild.channels.find(c => c.type === 'text' && c.name === `${chan}`)) {
            return msg.buildEmbed(`Sorry but that channel is not a text channel.`, {title: 'Error!', color: 'red'});               
           }
           if(!msg.guild.channels.find(c => c.type === 'text' && c.name === `${chan}`).id) {
            return msg.buildEmbed(`I was unable to find that channel.`, {title: 'Error!', color: 'red'});
           }
           chan = msg.guild.channels.find(c => c.type === 'text' && c.name === `${chan}`).id
            msg.buildEmbed(`I will now log events in <#${chan}>.`, {title: 'Success!', color: 'blue'});
            return await this.client.settings.update({ logs: chan },  { where: { _id: msg.guild.id } });
       }
    }
}


