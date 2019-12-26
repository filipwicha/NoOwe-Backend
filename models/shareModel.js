module.exports = (sequelize, Sequelize) => {
    const Share = sequelize.define('shares', {
        amount: {
            type: Sequelize.DOUBLE,
            allowNull: false
        }
    }, {timestamps: false})

    return Share
}