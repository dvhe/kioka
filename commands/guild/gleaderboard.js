const Command = require('../../structures/Command.js');
const beautify = require('json-beautify');

module.exports = class Leaderboard extends Command {
    constructor(client) {
        super();
        this.name = 'gleaderboard';
        this.aliases = ['glb', 'xplb'];
        this.description = 'Check the global leaderboards for xp';
        this.usage = '<>';
        this.cooldown = 0;
        this.hidden = false;
        this.guildOnly = false;
        this.botPerms = [];
        this.client = client;
    }

    async run(msg, args, response) {

        // const leaderboard = await this.client.accounts.findAll({ where: { _id: data }, order: [ ['level', 'xp'] ] });

        // const users = await this.client.accounts.paginate({
        //     where: { _id: i }, attributes: ['level', 'xp'], limit: 10
        // });

        // let i = this.client.users.forEach(i => {
        //     i.id;
        // })

        // let i = this.client.accounts.findAll({ where: { _id: -1 } });

        // let i = this.client.accounts.findAll({ attributes: { include: ['_id'] } });

        // const options = {
        //     attributes: ['_id', 'xp', 'old_xp', 'level'],
        //     page: 1,
        //     paginate: 10,
        //     // order: [['level', 'old_xp', 'xp']],
        //     where: { _id: 'id' } 
        // }

        // try {
        //     const users = await this.client.accounts.paginate(options);
        
        //     if(!args[0] || args[0] === '1') {
        //         let i = 0;
        //         let data = users.map(u => {
        //             i++;
        //             return `**${i}**: **${u.username}** - Level: **${u.level}** | XP: **${u.xp}**`;
        //         }).join('\n');
        //         return await msg.buildEmbed(`${data}`, {title: 'Global Leaderboard', color: 'text'});
        //     }
        // } catch(err) {
        //     return await msg.buildEmbed(`${err}`, {title: 'Error!', color: 'red'});
        // }

        try {
            const users = await this.client.accounts.findAll({_id: this.client.users.forEach(u => u.id)})
            let i = 0;
            let data = users.map(u => {
            i++;
            return `Rank: ${i} (\`${this.client.users.get(u._id) ? this.client.users.get(u._id).tag : 'Unknown#0000'}\`) Level: ${u.level} EXP: ${u.old_xp}/${u.xp}`;
            }).join('\n');
            let embed = {
                title: `Leaderboard`,
                description: data,
                color: 0x7D65BF,
                // author: {
                //     name: msg.guild.name,
                //     icon_url: msg.guild.iconURL()
                // }
            }
            return msg.channel.send({embed});
        } catch(err) {
            return await msg.buildEmbed(`${err}`, {title: 'Error!', color: 'red'});
        }
    }
}