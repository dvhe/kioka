const Command = require('../../structures/Command.js');
const beautify = require('json-beautify');

module.exports = class Autorole extends Command {
    constructor(client) {
        super();
        this.name = 'autorole';
        this.aliases = [];
        this.description = 'Set a role that will be added to members when they join.';
        this.usage = '<>';
        this.cooldown = 0;
        this.hidden = false;
        this.guildOnly = false;
        this.botPerms = [];
        this.client = client;
    }

    async run(msg, args) {
       
        let multiple = 

        let guild = await this.client.settings.findOne({where: { _id: msg.guild.id } });

        if(!args[0]) {
            const embed = new Discord.MessageEmbed()
            .setAuthor(`${msg.author.tag}`, msg.author.displayAvatarURL() || 'https://quak.ovh/5uCcVKm.png')
            .setDescription('<:xmark:627257276046114856> No arguments were provided. \`<add> <remove> <clear>\`')
            .setColor(0xE54846)
            return msg.channel.send({embed});
        }

        if(/add/.test(args[0])) {
            
        }

    }
}