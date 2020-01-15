exports.run = async (client, msg) => {
    if(msg.author.bot) return;
    if(msg.author.bot || !msg.guild) return;
    
    
    let guild = await client.settings.findOne({ where: { _id: msg.guild.id } });
    if(!guild) {
        client.logger.log(`[DATABASE] Created entry for (${msg.guild.name + " || " + msg.guild.id}) due to not finding it in the database.`);
        return await client.settings.create({
            _id: msg.guild.id,
            prefix: '+',
            levels: false,
            levellog: false,
            levelmsgs: false,
            deletedmsg: false,
            deletedlog: '',
            editedmsglog: '',
            editedmsgs: false,
            logs: '',
            logsEn: false,
            starboardEn: false,
            starboard: '',
            autorole: {},
            autoroleEn: false,
            reactionRoles: {},
            reactionEn: false,
            ignoredchan: '',
            modRoleEn: false,
            modRole: ''
        });
    }

    let user = await client.accounts.findOne({ where: { _id: msg.author.id } });
    if(!user) {
        return await client.accounts.create({
             _id: msg.author.id,
             bank: 0,
             balance: 0,
             inventory: {},
             level: 1,
             xp: 0,
             old_xp: 0,
             married: false,
             marriedTo: [],
             admin: false,
             donator: false,
             developer: false,
             timeout: ''
         }); 
     }

     if(!user.timeout.includes(msg.author.id)) {
        await client.accounts.update({ timeout: msg.author.id }, { where: { _id: msg.author.id } });
        setTimeout(async () => await client.accounts.update({ timeout: '' }, { where: { _id: msg.author.id } }), 10000);
    }

    // Check if that channel is being ignored or not for XP

    if(!guild.ignoredchan.includes(msg.channel.id)) {
     if(guild.levels == true && guild.levelmsgs == true) {
            if(msg.channel.permissionsFor(msg.guild.me).has('SEND_MESSAGES')) {
                // if(user.xp >= user.level) {
                    let numbers = [25, 10, 30];
                    let oldxp = numbers[Math.floor(Math.random() * numbers.length)];
                    user.xp = Math.trunc(user.level ** 3 / 1.2);
                    if(user.level === 1) user.xp = 200;
                    if(user.level === 2) user.xp = 350;
                    if(user.level === 3) user.xp = 500;
                    if(user.level === 4) user.xp = 760;
                    if(user.level === 5) user.xp = 840;
                    if(user.level === 6) user.xp = 900;
                    if(user.level === 7) user.xp = 1200;
                    if(user.level === 8) user.xp = 1500;
                    if(user.level === 9) user.xp = 1720;
                    if(user.level === 10) user.xp = 1840;
                    if(user.level === 11) user.xp = 2000;
                    if(user.level === 12) user.xp = 2145;
                    if(user.level === 13) user.xp = 2350;
                    if(user.level === 14) user.xp = 2500;
                    /*
                    switch(user.level) {
                        case user.level === 1:
                            user.xp = 200; break;
                        case user.level === 2:
                            user.xp = 350; break;
                        case user.level === 3:
                            user.xp = 500; break;
                        case user.level === 4:
                            user.xp = 760; break;  
                        case user.level === 5:
                            user.xp = 840; break;    
                        case user.level === 6:
                            user.xp = 900; break;    
                        case user.level === 7:
                            user.xp = 1200; break;
                        case user.level === 8:
                            user.xp = 1500; break;  
                        case user.level === 9:
                            user.xp = 1720; break;    
                        case user.level === 10:
                            user.xp = 1840; break;   
                        case user.level === 11:
                            user.xp = 2000; break;   
                        case user.level === 12:
                            user.xp = 2145; break;   
                        case user.level === 13:
                            user.xp = 2350; break;   
                        case user.level === 14:
                            user.xp = 2500; break;    
                        default: user.level;  
                    }
                    */
                    if(user.timeout.includes(msg.author.id)) oldxp = 0;
                    // level 15 2812
                await client.accounts.update({ old_xp: parseInt(user.old_xp) + oldxp, xp: user.xp }, { where: { _id: msg.author.id } });
                if(user.old_xp >= user.xp) {
                    user.level++;
                    await client.accounts.update({ level: user.level, old_xp: 0 }, { where: { _id: msg.author.id } });
                    return await msg.buildEmbed(`Congratulations you have leveled up to **${user.level}** <:tada:395242471736475669>`, {title: `${msg.member.user.username}`, color: 'title'})
                }
            }
        }
    }
        

    const command = msg.content.slice(guild.prefix.length).toLowerCase().split(/\s+/)[0];
    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
    const args = msg.content.split(' ').splice(1);

    if(!msg.content.startsWith(guild.prefix)) return;
    if(!cmd) return;
    cmd.run(msg, args);
}