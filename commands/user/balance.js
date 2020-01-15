const Command = require('../../structures/Command.js');

module.exports = class Balance extends Command {
    constructor(client) {
        super();
        this.name = 'balance';
        this.aliases = ['bal'];
        this.description = 'See what your balance is in the server.';
        this.usage = '<balance>';
        this.cooldown = 0;
        this.hidden = false;
        this.guildOnly = false;
        this.botPerms = [];
        this.client = client;
    }

    async run(msg, args, data) {

        let acc = msg.mentions.users.first() || this.client.users.get(args[0]);
        if(!acc) acc = msg.author;

        if(acc.bot) {
            const embed = new Discord.MessageEmbed()
            .setAuthor(`${msg.mentions.users.first().tag}`, msg.mentions.users.first().displayAvatarURL() || 'https://discordapp.com/assets/6debd47ed13483642cf09e832ed0bc1b.png')
            .setColor(0x3463A7)
            .addField('Cash:', `<:Flower:626159821745422375> ∞`, true)
            .addField('Bank:', `:bank: ∞`, true)
            embed.setTimestamp();
           return msg.channel.send({embed});
        }

        let user = await this.client.accounts.findOne({where: { _id: acc.id } });

        const embed = new Discord.MessageEmbed()
        .setAuthor(`${acc.tag}`, acc.displayAvatarURL() || 'https://discordapp.com/assets/6debd47ed13483642cf09e832ed0bc1b.png')
        .setColor(0x3463A7)
        .addField('Cash:', `<:Flower:626159821745422375> ${user.balance.toLocaleString()}`, true)
        .addField('Bank:', `:bank: ${user.bank.toLocaleString()}`, true)
        embed.setTimestamp();

       return msg.channel.send({embed});

    }
}