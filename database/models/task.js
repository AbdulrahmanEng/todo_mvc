const Sequelize = require('sequelize');

module.exports = function (sequelize, Sequelize) {
    const Task = sequelize.define('task', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
        },
        user_id: {
            type: Sequelize.UUID,
            allowNull: false
        },
        body: {
            type: Sequelize.STRING,
            required: true
        },
        complete: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
    }, {
            paranoid: false,
            underscored: true
        });
    return Task;
}