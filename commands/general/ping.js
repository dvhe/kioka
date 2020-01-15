const Command = require('../../structures/Command.js');

module.exports = class Ping extends Command {
    constructor(client) {
        super();
        this.name = 'ping';
        this.aliases = [];
        this.description = 'Get the latency and API response time of the bot.';
        this.usage = '';
        this.cooldown = 0;
        this.hidden = false;
        this.guildOnly = false;
        this.botPerms = 0;
        this.client = client;
    }

    async run(msg) {
        let message = await msg.channel.send('Pong!');
        let response = `Pong! API: ${this.client.ws.ping}ms\nMessage: ${message.createdTimestamp - msg.createdTimestamp}ms`;
        // message.editEmbed(response, {color: 'blue'});
        return message.edit(response);
    }
}