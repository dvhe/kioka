const sequelize = require('sequelize');
const config = require('../../config');
const logger = require('../../modules/Logger');

module.exports = class Database {
    constructor() {
        this.databaseConnection = new sequelize({
            host: config.database.host,
            port: config.database.port,
            username: config.database.username,
            password: config.database.password,
            database: config.database.name,
            dialect: 'postgres',
            logging: false,
            define: {
                timestamps: false,
                freezeTableName: true
            }
        });
    }

    async connect() {
        try {
            await this.databaseConnection.authenticate();
            logger.db('Successfully connected to database.');
        } catch (error) {
            logger.error(`Unable to connect to database : ${error}`);
        }
    }


   async destroy() {
        await this.databaseConnection.close();
        logger.warn('Closed connection to database.')
    }

    async sync() {
        await this.databaseConnection.authenticate().then(() => {
            return this.databaseConnection.sync({ force: true })
        });
        return console.log('Synced the database.')
    }
    
};
