const Sequelize = require('sequelize');

module.exports = function (sequelize, Sequelize) {
    const User = sequelize.define('user', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
        },
        email: {
            type: Sequelize.STRING,
            required: true
        },
        password: {
            type: Sequelize.STRING,
            required: false
        },
        forename: {
            type: Sequelize.STRING,
            required: true
        },
        surname: {
            type: Sequelize.STRING,
            required: true
        },
        role: {
            type: Sequelize.ENUM,
            values: ['user', 'admin','disabled']
        }
    });

    return User;
}