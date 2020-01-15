module.exports = Discord.Structures.extend('Message', Message => class extends Message {
    async buildEmbed(text, options = {}, msg) {
        return new Promise((resolve, reject) => {
            if(!text) return reject(new Error('Cannot send an empty message.'));
            options = {
                title: options.title || '',
                color: options.color };
            
                
            const customColors = {
                blue: 0x2394c4 ,
                red: 0xc61d1d ,
                teal: 0x43b2d3 ,
                pink: 0xea7ed8 , 
                default: 0x42d270,
                text: this.member.roles.highest.hexColor
            }

            options.color = customColors[options.color];
            this.channel.send({ embed: { title: options.title, description: text, color: options.color  } });
        });
    }

    async editEmbed(text, options = {}) {
        return new Promise((resolve, reject) => {
            if(!text) return reject(new Error('Cannot send an empty message.'));
            options = {
                title: options.title || '',
                color: options.color || 0x1abc9c };
            
                
            const customColors = {
                blue: 0x2394c4 ,
                teal: 0x43b2d3 ,
                red: 0xc61d1d
            }

            options.color = customColors[options.color];
            this.edit({ embed: { title: options.title, description: text, color: options.color } });
        });
    }
});
