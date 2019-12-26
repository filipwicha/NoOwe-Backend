module.exports = (sequelize, Sequelize) => {
    const Budget = sequelize.define('budgets', {
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        color: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {timestamps: false, underscored: true})

    return Budget
}