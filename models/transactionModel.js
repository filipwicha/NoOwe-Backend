module.exports = (sequelize, Sequelize) => {
    const Transaction = sequelize.define('transactions', {
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        date: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
            allowNull: false
        }
    }, {timestamps: false})

    return Transaction
}