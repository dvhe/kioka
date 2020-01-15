module.exports = (sequelize, DataTypes) => {
    return sequelize.define('users', {
        _id: {
            primaryKey: true,
            type: DataTypes.STRING,
            // unique: true
        },
        bank: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        balance: {
            type: DataTypes.INTEGER,
            defaultValue: 100
        },
        inventory: {
            type: DataTypes.JSON
        },
        level: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        },
        xp: {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
        old_xp: {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
        married: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        marriedTo: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            defaultValue: []
        },
        marriedSince: {
            type: DataTypes.JSON,
            defaultValue: {}
        },
        developer: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        donator: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        admin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        timeout: {
            type: DataTypes.STRING,
            defaultValue: ''
        }
    });
}