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
        let me = await this.client.accounts.findOne({where: { _id: msg.author.id } });

        if(!args[0]) {
            return msg.buildEmbed('<:cross:627790712288706560>  Invalid arguments were provided `<number> <all>`.', {color: 'red'})
        }

        if(args[0] === '' || args[0] === null) {
            return msg.buildEmbed('You did not provide a number.', {color: 'red'})
        }

        if(!Number(args[0])) {
            return msg.buildEmbed('You did not provide a number.', {color: 'red'})
        }

        if(me.bank < 0) {
            return msg.buildEmbed(`<:cross:627790712288706560>  You don't have enough money. ${me.bank}/${args[0].length - me.bank}`, {color: 'red'})
        }

        if(me.bank <= 0) {
            return msg.buildEmbed(`<:cross:627790712288706560>  You don't have enough money.`, {color: 'red'})
        }

        if(/all/.test(args[0])) {
            const embed = new Discord.MessageEmbed()
            .setAuthor(`${me.tag}`, me.displayAvatarURL() || 'https://discordapp.com/assets/6debd47ed13483642cf09e832ed0bc1b.png')
            .setColor(0x3FB97C)
            .setDescription(`<:checkmark:627790712615731210>  You have withdrawn <:coin:627448919240081411>**${me.bank}** into your balance`);
           msg.channel.send({embed});
           return await this.client.accounts.update({ balance: me.bank, bank: 0 }, { where: { _id: acc.id } });
        }

        if(args[0]) {
            const embed = new Discord.MessageEmbed()
            .setAuthor(`${me.tag}`, me.displayAvatarURL() || 'https://discordapp.com/assets/6debd47ed13483642cf09e832ed0bc1b.png')
            .setColor(0x3FB97C)
            .setDescription(`<:checkmark:627790712615731210>  You have withdrawn <:coin:627448919240081411>**${args[0].toLocaleString()}** into your balance`);
           msg.channel.send({embed});
            return await this.client.accounts.update({ balance: args[0], bank: 0 }, { where: { _id: acc.id } });
        }
    }
}