module.exports = (sequelize, Sequelize) => {
    const Currency = sequelize.define('currencies', {
        code: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {timestamps: false})


    return Currency
}