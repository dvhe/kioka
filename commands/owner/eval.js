const Command = require('../../structures/Command.js');

module.exports = class Eval extends Command {
    constructor(client) {
        super();
        this.name = 'eval';
        this.aliases = ['ev'];
        this.description = '';
        this.usage = '';
        this.cooldown = 0;
        this.hidden = false;
        this.guildOnly = false;
        this.botPerms = [];
        this.client = client;
    }

    async run(msg, args) {
        if(msg.author.id !== '215302985826304010' && msg.author.id !== '130442810456408064') {
            return msg.buildEmbed('hecc off', {color: 'red'});
        }

        if(/--silent|--s/.test(args[0])) {
            args = msg.content.split(' ').splice(2).join(' ');
            var evaled = eval(args);
            return msg.channel.send(this.clean(evaled));
        } else {
        
        try {
            var evaled = eval(args.join(' '));
            if (typeof evaled !== 'string')
                evaled = require('util').inspect(evaled);
                msg.buildEmbed(`**Output**:\n${this.clean(evaled)}`, {color: 'blue'});
        } catch(e) {
            msg.buildEmbed(`Error occurred:\n${e}`, {color: 'red'});
        }

        }
    }

    clean(text) {
        if (typeof (text) === 'string') {
            return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203));
    
        }
        else {
            return text;
        }
    }
}