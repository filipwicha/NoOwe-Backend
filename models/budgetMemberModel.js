module.exports = (sequelize, Sequelize) => {
    const BudgetMember = sequelize.define('budget_members', {
        // id: {
        //     type: Sequelize.INTEGER,
        //     primaryKey: true,
        //     allowNull: false
        // },
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
        }/* ,
        budget_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: 'budgets',
            referencesKey: 'id'
        }, */
    }, {timestamps: false})

    return BudgetMember
}