module.exports = class permissionHandler {
    constructor(client) {
        this.client = client;
    }

    get permissions(guild, member) {
        let settings = await this.client.settings.findOne({where: { _id: guild.id } });
        let level = 0;
        // Moderator
        if(member.roles.has(settings.modRole)) level = 3;
        // Kick / Ban
        if(member.permissions.has('BAN_MEMBERS') && member.permissions.has('KICK_MEMBERS')) level = 4;
        // Admin
        if(member.roles.has(settings.adminRole) || member.permissions.has('MANAGE_SERVER') || member.permissions.has('ADMINISTRATOR')) level = 5;
        // Guild Owner
        if(member === guild.owner) level = 6
        // Bot Owner
        if(config.discord.owners.has(member.id)) level = 7;

        return level;
    }
};