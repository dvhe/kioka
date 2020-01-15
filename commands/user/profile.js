const Command = require('../../structures/Command.js');

module.exports = class Profile extends Command {
    constructor(client) {
        super();
        this.name = 'profile';
        this.aliases = ['p', 'level', 'rank'];
        this.description = 'View your profile.';
        this.usage = '<profile>';
        this.cooldown = 0;
        this.hidden = false;
        this.guildOnly = false;
        this.botPerms = [];
        this.client = client;
    }

    async run(msg, args) {

        let acc = msg.mentions.users.first() || this.client.users.get(args[0]);
        let mem = msg.mentions.members.first() || this.client.guilds.get(msg.guild.id).members.get(args[0]);
        if(!acc) acc = msg.author;
        if(!mem) mem = msg.member;

        if(acc.bot) {
            return msg.channel.send('Sorry <3');
        }

        let user = await this.client.accounts.findOne({where: { _id: acc.id } });

        const embed = new Discord.MessageEmbed()

        // if(user.developer && user.admin === true) {
        //     embed.setDescription(`**${mem.user.username}'s profile**  <:admin:626196116664483844> <:developer:626159793937186826>`);
        // }
        // if(user.developer === true) {
        //     embed.setDescription(`**${mem.user.username}'s profile** <:developer:626159793937186826> `);
        // }
        // if(user.admin === true) {
        //     embed.setDescription(`**${mem.user.username}'s profile**  <:admin:626196116664483844>`);
        // }

        if(config.discord.owners.includes(acc.id)) {
            embed.setThumbnail(acc.displayAvatarURL() || 'https://discordapp.com/assets/6debd47ed13483642cf09e832ed0bc1b.png')
            embed.setColor(mem.roles.highest.hexColor || 0x3463A7)
            embed.addField('Information', `Level: ${user.level}\nXP: ${user.old_xp} / ${user.xp.toLocaleString()}\n`, true)
            // embed.addField('Relationship', 'You haven\'t found a waifu yet ;-;', true)
            embed.setDescription(`**${mem.user.username}'s profile**  <:admin:626196116664483844> <:developer:626159793937186826>`);
            return msg.channel.send({embed});
        }

        if (user.marriedTo === undefined || user.marriedTo.length == 0 || user.marriedTo === null) {
            embed.setThumbnail(acc.displayAvatarURL() || 'https://discordapp.com/assets/6debd47ed13483642cf09e832ed0bc1b.png')
            embed.setColor(mem.roles.highest.hexColor || 0x3463A7)
            embed.addField('Information', `Level: ${user.level}\nXP: ${user.old_xp} / ${user.xp.toLocaleString()}\n`, true)
            // embed.addField('Relationship', 'You haven\'t found a waifu yet ;-;', true)
            embed.setDescription(`**${mem.user.username}'s profile**  `)
            return msg.channel.send({embed});
        }

        // embed.setAuthor(`${mem.user.username}'s profile`, acc.displayAvatarURL() || 'https://discordapp.com/assets/6debd47ed13483642cf09e832ed0bc1b.png')
        embed.setThumbnail(acc.displayAvatarURL() || 'https://discordapp.com/assets/6debd47ed13483642cf09e832ed0bc1b.png')
        embed.setColor(mem.roles.highest.hexColor || 0x3463A7)
        embed.addField('Information', `Level: ${user.level}\nXP: ${user.old_xp} / ${user.xp.toLocaleString()}\n`, true)
        // embed.addField('Relationship', user.marriedTo, true)
        embed.setDescription(`**${mem.user.username}'s profile**  `)
        return msg.channel.send({embed});

    }
}