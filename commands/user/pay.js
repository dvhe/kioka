const Command = require('../../structures/Command.js');

module.exports = class Pay extends Command {
    constructor(client) {
        super();
        this.name = 'pay';
        this.aliases = ['give'];
        this.description = 'Give someone some of your money.';
        this.usage = '<pay>';
        this.cooldown = 0;
        this.hidden = false;
        this.guildOnly = false;
        this.botPerms = [];
        this.client = client;
    }

    async run(msg, args) {

        let number = msg.content.split(' ').splice(2, 2);

        let acc = msg.mentions.users.first() || this.client.users.get(args[0]);

        if(!acc) {
            return msg.buildEmbed(`Nobody was mentioned.`, {color: 0xC61D1D})
        }

        if(acc.bot) {
            return await msg.buildEmbed('You are unable to pay me due to me being a bot.')
        }

        let user = await this.client.accounts.findOne({where: { _id: acc.id } });
        let me = await this.client.accounts.findOne({where: { _id: msg.author.id } });

        if(!number) {
            return msg.buildEmbed('You did not provide a number.', {color: 0xC61D1D})
        }

        if(acc && number === '' || number === null) {
            return msg.buildEmbed('You did not provide a number.', {color: 0xC61D1D})
        }

        if(!Number(number)) {
            return msg.buildEmbed('You did not provide a number.', {color: 0xC61D1D})
        }

        if(me.balance < 0) {
            return msg.buildEmbed(`You do not have that much money. ${me.balance}/${number.length - user.balance}`, {color: 0xC61D1D})
        }

        if(me.balance <= 0) {
            return msg.buildEmbed(`You do not have that much money. ${me.balance}/${number.length - me.balance}`, {color: 0xC61D1D})
        }

        if(acc.id === msg.author.id) {
            return msg.buildEmbed('Nice try.', {color: 0xC61D1D})
        }

        if(me.balance >= 100) {
            await this.client.accounts.update({ balance: parseInt(number) + user.balance }, { where: { _id: acc.id } });
            msg.buildEmbed(`:ok_hand: ${acc} has recieved your payment of ${number} <:Flower:626159821745422375>.`, {color: 0x34a8eb})
            await this.client.accounts.update({ balance:  me.balance - parseInt(number)}, { where: { _id: msg.author.id } });
        }

        const embed = new Discord.MessageEmbed()
        .setAuthor(`${me.tag}`, me.displayAvatarURL() || 'https://discordapp.com/assets/6debd47ed13483642cf09e832ed0bc1b.png')
        .setColor(0xFF8C00)
        .addField('Cash:', `<:Flower:626159821745422375> ${me.balance.toLocaleString()}`, true)
        .addField('Bank:', `:bank: ${me.bank.toLocaleString()}`, true)
        embed.setTimestamp();

       return msg.channel.send({embed});

    }
}