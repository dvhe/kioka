module.exports = Discord.Structures.extend('GuildMember', GuildMember => class extends GuildMember {
    missingPerms(perm) {
        let missing = [];

        for(perm in this.client.permissions) {
            console.log(this.client.permissions);
            missing.push(perm);
        }
        return missing;
    }
    get balance() {
        let user = this.client.accounts.findOne({where: { _id: this.id } });
        return user.balance;
    }
});
