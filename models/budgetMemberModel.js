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
            defaultValue: makePrivateKey(4)
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

function makePrivateKey(length) {
    var result           = ''
    var characters       = 'abcdefghijklmnopqrstuvwxyz0123456789'
    var charactersLength = characters.length

    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }

    return result
 }