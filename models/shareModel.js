module.exports = (sequelize, Sequelize) => {
    const Share = sequelize.define('shares', {
        // id: {
        //     type: Sequelize.INTEGER,
        //     primaryKey: true,
        //     allowNull: false
        // },
        amount: {
            type: Sequelize.DECIMAL(12,2),
            allowNull: false
        }/* ,
        transaction_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: 'transactions',
            referencesKey: 'id'
        },
        member_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: 'budget_members',
            referencesKey: 'id'
        } */
    }, {timestamps: false})

    return Share
}