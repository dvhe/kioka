module.exports = Discord.Structures.extend('TextChannel', TextChannel => class extends TextChannel {
    get readable() {
        return this.permissionsFor(this.guild.me).has('VIEW_CHANNEL'); 
      }
    
      get speakable() {
        return (this.readable && this.permissionsFor(this.guild.me).has('SEND_MESSAGES'));
    }
});