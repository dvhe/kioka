const Command = require('../../structures/Command.js');

module.exports = class Prefix extends Command {
    constructor(client) {
        super();
        this.name = 'prefix';
        this.aliases = [];
        this.description = 'Set the current prefix to a different one.';
        this.usage = '<prefix>';
        this.cooldown = 0;
        this.hidden = false;
        this.guildOnly = false;
        this.botPerms = [];
        this.client = client;
    }

    async run(msg, args) {

        let guild = await this.client.settings.findOne({where: { _id: msg.guild.id } });

        if(guild.modRoleEn === true && !msg.member.roles.has(guild.modRole) || !msg.guild.member(msg.author).permissions.has('MANAGE_SERVER') || !msg.guild.member(msg.author).permissions.has('ADMINISTRATOR') || !msg.member.id === msg.guild.owner.id) {
            return msg.channel.send('You are unable to use this command due to lacking permission.');
        }

        if(!args.join(' ')) {
            return msg.channel.send('No prefix was provided.');
        }

        if(args.join(' ') === guild.prefix) {
           return msg.channel.send('Unable to change the prefix due to it being the same one.');
        }

        if(args.join(' ').length > 10) {
            return msg.channel.send(`Unable to change the prefix due to it being past 10 characters. ${args.join(' ').length - 10} characters past the limit`);
        }
        
        if(args[0]) {
            await this.client.settings.update({ prefix: args.join(' ') }, { where: { _id: msg.guild.id } });
            return msg.channel.send(`The guild prefix was set to ${args.join(' ')}`);
        }
       
       // return msg.channel.send('To use this command please visit localhost/panel/auth/login/');


    }
}