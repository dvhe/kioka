const Command = require('../../structures/Command.js');

module.exports = class Donator extends Command {
    constructor(client) {
        super();
        this.name = 'donator';
        this.aliases = [];
        this.description = 'Set a user/guild to donator status';
        this.usage = '<>';
        this.cooldown = 0;
        this.hidden = false;
        this.guildOnly = false;
        this.botPerms = [];
        this.client = client;
    }

    async run(msg, args) {

        let user = await this.client.accounts.findOne({ where: { _id: args[0] } });

        if(!config.discord.owners.includes(msg.author.id)) {
            return;
        }

        if(!args[0]) {
            const embed = new Discord.MessageEmbed()
            .setAuthor(`${msg.author.tag}`, msg.author.displayAvatarURL() || 'https://quak.ovh/5uCcVKm.png')
            .setDescription('<:xmark:627257276046114856> No user was provided.\`')
            .setColor(0xE54846)
            return msg.channel.send({embed});
        }

        if(user.donator === true) {
            msg.guild.members.get(args[0]).roles.remove('627040884738752513');
            msg.buildEmbed('Donator status removed.', {color: 'red'});
            return await this.client.accounts.update({ donator: false },  { where: { _id: args[0] } });
        }

        msg.guild.members.get(args[0]).roles.add('627040884738752513');
        msg.buildEmbed('Donator status activated :ok_hand:', {color: 'text'});
        return await this.client.accounts.update({ donator: true },  { where: { _id: args[0] } });
    }
}