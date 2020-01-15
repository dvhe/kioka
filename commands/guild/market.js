const Command = require('../../structures/Command.js');

module.exports = class Market extends Command {
    constructor(client) {
        super();
        this.name = 'market';
        this.aliases = ['shop'];
        this.description = 'Configurate the bot.';
        this.usage = '<config>';
        this.cooldown = 0;
        this.hidden = false;
        this.guildOnly = false;
        this.botPerms = [];
        this.client = client;
    }

    async run(msg, args) {
       
        let guild = await this.client.settings.findOne({where: { id: msg.guild.id } });
        return msg.channel.send(guild);

    }
}