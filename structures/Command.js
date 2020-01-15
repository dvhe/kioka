//const Permissions = require('./permissionHandler');
module.exports = class Command {
    constructor(client, options = {}, file, guild, permission) {
        this.client = client;
        this.name = options.name || file;
        this.aliases = options.aliases || [];
        this.description = options.description || 'No description was provided.'
        this.usage = options.usage || 'No usage was provided.';
        this.cooldown = options.cooldown || 0;
        this.hidden = options.hidden || false;
        this.guildOnly = options.guildOnly || false;
        this.botPerms = new Discord.Permissions(options.botPerms || []);
        // this.permissions = Permissions.permissions(this, options.guild, options.member);
        this.file = file;
    }

    async run(msg, args) {
        throw new Error(`Command doesn't have a valid run method`);
    }
    
}