module.exports = (sequelize, Sequelize) => {
    const BudgetMember = sequelize.define('budget_members', {
        nickname: {
            type: Sequelize.STRING,
            allowNull: false
        },
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: true,
            defaultValue: null
        },
        private_key: {
            type: Sequelize.STRING,
            allowNull: true,
            defaultValue: " "
        }
    }, {timestamps: false})

    return BudgetMember
}