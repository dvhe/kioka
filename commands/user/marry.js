const Command = require('../../structures/Command.js');

module.exports = class Marry extends Command {
    constructor(client) {
        super();
        this.name = 'marry';
        this.aliases = [];
        this.description = 'Marry your precious waifu(s).';
        this.usage = '<marry>';
        this.cooldown = 0;
        this.hidden = false;
        this.guildOnly = false;
        this.botPerms = [];
        this.client = client;
    }

    async run(msg, args) {

        let acc = msg.mentions.members.first() || this.client.users.get(args[0]);
        if(!acc) acc = msg.member;

        if(acc.bot) {
            return msg.buildEmbed('Sorry but you can\'t marry me ;-;', {color: 'red'});
        }

        let user = await this.client.accounts.findOne({where: { _id: acc.id } });

        if(!acc || acc.id === msg.author.id) {
            return msg.buildEmbed('I know that you are lonely but you can\'t marry yourself ;-;', {color: 'red'});
        }

        msg.buildEmbed(`${msg.member.user.username} is wanting to marry you! type yes to accept.`);

        const filter = msg.author.id === acc.id && ['yes', 'y'].includes(msg.content);
        msg.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] }).then(collected => {
            if(collected.first().content == ['yes', 'y']) {
                this.client.accounts.update({ marriedTo: [acc.user.username] }, { where: { _id: msg.author.id } });
                this.client.accounts.update({ marriedTo: [msg.member.user.username] }, { where: { _id: acc.id } });
                return msg.buildEmbed(`<a:aTada:626896545052098560> ${acc} :two_hearts: ${msg.author} <a:aTada:626896545052098560>`);
            }
        }).catch(() => {
            return msg.buildEmbed(`${acc.user.username} did not respond ;-;`);
        });

        /*
       if(msg.author.id === acc.id && msg.content.toLowerCase() === 'yes') {
            await this.client.settings.update({ marriedTo: [acc.user.username] }, { where: { _id: msg.author.id } });
            await this.client.settings.update({ marriedTo: msg.member.user.username }, { where: { _id: acc.id } });
            return msg.buildEmbed(`<a:aTada:626896545052098560> ${acc} :two_hearts: ${msg.author} <a:aTada:626896545052098560>`, {color: 'blue'}).setTimeout(() => {
                return m.buildEmbed(`${acc.user.username} did not respond ;-;`, {color: 'red'});
            }, 30000);;
       }*/

    }
}