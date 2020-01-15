exports.run = (client) => {
    client.logger.success(`${client.user.username} is online and ready!`);
    client.database.connect();
}
