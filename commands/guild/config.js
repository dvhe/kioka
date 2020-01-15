const Command = require('../../structures/Command.js');
const beautify = require('json-beautify');

module.exports = class Config extends Command {
    constructor(client) {
        super();
        this.name = 'config';
        this.aliases = [];
        this.description = 'Configurate the bot.';
        this.usage = '<config>';
        this.cooldown = 0;
        this.hidden = false;
        this.guildOnly = false;
        this.botPerms = [];
        this.client = client;
    }

    async run(msg, args) {
       
        let guild = await this.client.settings.findOne({where: { _id: msg.guild.id } });
        let acc = await this.client.accounts.findOne({where: { _id: msg.author.id } });
        // // return msg.channel.send(JSON.stringify(guild));
        // // return msg.channel.send(JSON.stringify(acc));
        // msg.channel.send(beautify(guild, null, 2, 80));
        // return msg.channel.send(beautify(acc, null, 2, 80));

        if(/me/.test(args[0])) {
let embed = {

description: `**Configuration**

Balance: ${acc.balance}

Bank: ${acc.bank}

Level: ${acc.level}

XP: ${acc.xp}

Old XP: ${acc.old_xp}

Married: ${acc.married ? acc.married : 'No'}

Married To: ${acc.marriedTo ? acc.marriedTo : 'No one'}

Developer: ${acc.developer ? acc.developer : 'No'}

Admin: ${acc.admin ? acc.admin : 'No'}

Donator: ${acc.donator ? acc.donator : 'No'}

Timeout: ${acc.timeout ? acc.timeout : 'No'}
`,

color: 0x7D65BF,
author: {
    name: `${msg.author.tag}`,
    icon_url: msg.author.displayAvatarURL()
}

}

return msg.channel.send({embed});
       
}

let embed = {

description: `**Configuration**

Prefix: ${guild.prefix}
            
Logs: ${guild.logs ? `<#${guild.logs}>` : `There isn\'t a logs channel set.`} \`(Enabled : ${guild.logsEn ? 'Yes' : 'No'})\`

Levels: ${guild.levels ? 'Enabled' : 'Disabled'}
            
Level Messages: ${guild.levelmsgs ? 'Enabled' : 'Disabled'}

Deleted Messages: ${guild.deletedmsg ? 'Enabled' : 'Disabled'}

Edited Messages: ${guild.editedmsgs ? 'Enabled' : 'Disabled'}

Starboard: ${guild.starboard ? `<#${guild.starboard}>` : 'There isn\'t a starboard channel set.'} \`(Enabled : ${guild.starboardEn ? 'Yes' : 'No'})\`

Autoroles: ${guild.autorole ? JSON.stringify(guild.autorole) : 'There isn\'t any set.'} \`(Enabled : ${guild.autoroleEn ? 'Yes' : 'No'})\`

Reaction Roles: ${guild.reactionRoles ? JSON.stringify(guild.reactionRoles) : 'There isn\'t any set.'} \`(Enabled : ${guild.reactionEn ? 'Yes' : 'No'})\`

Ignored Channels: ${guild.ignoredchan ? guild.ignoredchan : 'There isn\'t any channels in the ignore list.'}

Moderator Role: ${guild.modRole ? guild.modRole : 'There isn\'t one set'} \`(Enabled : ${guild.modRoleEn ? 'Yes' : 'No'})\`
`,

color: 0x7D65BF,
author: {
    name: `${msg.guild.name}`,
    icon_url: msg.guild.iconURL()
}

}

        return msg.channel.send({embed});

    }
}