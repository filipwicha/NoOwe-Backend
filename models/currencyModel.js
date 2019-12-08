module.exports = (sequelize, Sequelize) => {
    const Currency = sequelize.define('currencies', {
        // id: {
        //     type: Sequelize.INTEGER,
        //     primaryKey: true,
        //     allowNull: false
        // },
        code: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {timestamps: false})


    return Currency
}