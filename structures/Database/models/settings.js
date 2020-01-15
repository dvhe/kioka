module.exports = (sequelize, DataTypes) => {
    return sequelize.define('settings', {
        _id: {
            primaryKey: true,
            type: DataTypes.STRING,
            // unique: true
        },
        prefix: {
            type: DataTypes.STRING,
            defaultValue: '.'
        },
        levels: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        levellog: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        levelmsgs: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        deletedmsg: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        deletedlog: {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        editedmsglog: {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        editedmsgs: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        logs: {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        logsEn: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        starboardEn: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        starboard: {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        autorole: {
            type: DataTypes.JSON,
            defaultValue: {}
        },
        autoroleEn: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        reactionRoles: {
            type: DataTypes.JSON,
            defaultValue: {}
        },
        reactionEn: {
            type: DataTypes.JSON,
            defaultValue: {}
        },
        ignoredchan: {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        modRoleEn: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        modRole: {
            type: DataTypes.STRING,
            defaultValue: ''
        }
    });
}