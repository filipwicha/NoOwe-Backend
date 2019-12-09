module.exports = (sequelize, Sequelize) => {
    const Transaction = sequelize.define('transactions', {
        // id: {
        //     type: Sequelize.INTEGER,
        //     primaryKey: true,
        //     allowNull: false
        // },
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        date: {
            type: Sequelize.DATE,
            defaultValue: new Date(),
            allowNull: false
        }/* ,
        budget_id: {
            type: Sequelize.INTEGER,
            references: 'budgets',
            referencesKey: 'id'
        },
        category_id: { 
            type: Sequelize.INTEGER,
            allowNull: false,
            references: 'categories',
            referencesKey: 'id'
        } */
    }, {timestamps: false})

    return Transaction
}