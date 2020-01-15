global.Discord = require('discord.js');
global.config = require('./config.js');
require('./extensions/Message');
require('./extensions/TextChannel');
const Database = require('./structures/Database/Database');
const fs = require('fs');
const commandHandler = require('./structures/commandHandler.js');

class Client extends Discord.Client {
    constructor() {
        super();
        this.commandHandler = new commandHandler(this);

        this.database = new Database(this);
        //this.database.sync();

        this.logger = require('./modules/Logger');

        this.accounts = this.database.databaseConnection.import('./structures/Database/models/users');
        this.settings = this.database.databaseConnection.import('./structures/Database/models/settings');

        Promise.all([this.commandHandler.load()]);
    }
}

const client = new Client({
    disableEveryone: true,
    disabledEvents: ['CHANNEL_PINS_UPDATE', 'RELATIONSHIP_ADD', 'RELATIONSHIP_REMOVE', 'TYPING_START', 'VOICE_SERVER_UPDATE', 'VOICE_STATE_UPDATE'],
    messageCacheMaxSize: 100
});

process.on('uncaughtException', e => {
    client.logger.error(`Client error: ${e}`);
})

client.on('error', e => {
    client.logger.error(`Client error: ${e}`);
})

fs.readdir('./events/', (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        let eventFunction = require(`./events/${file}`);
        let eventName = file.split('.')[0];
        client.on(eventName, (...args) => eventFunction.run(client, ...args));
    });
});

client.login(config.discord.token);
