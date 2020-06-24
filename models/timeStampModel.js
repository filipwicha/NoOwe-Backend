module.exports = (sequelize, Sequelize) => {
    const TimeStamp = sequelize.define('timestamp', {
        uuid: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        date: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW
        },
        relay: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: 0
        },
        power_switch: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: 0
        }
    }, {timestamps: false})

    return TimeStamp
}