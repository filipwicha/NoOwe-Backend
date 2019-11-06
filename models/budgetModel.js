// module.exports = (sequelize, Sequelize) => {
//     const Budget = sequelize.define('budgets', {
//         id: {
//             type: Sequelize.INTEGER,
//             primaryKey: true,
//             allowNull: false
//         },
//         name: {
//             type: Sequelize.STRING,
//             allowNull: false
//         },
//         color: {
//             type: Sequelize.STRING,
//             allowNull: false
//         },
//         owner_id: {
//             type: Sequelize.INTEGER,
//             allowNull: false,
//             references: 'users', 
//             referencesKey: 'id'
//         },
//         currency_id: {
//             type: Sequelize.INTEGER,
//             allowNull: false,
//             references: 'currencies',
//             referencesKey: 'id'
//         }
//     })

//     Budget.associate = function(models){
//         models.Budget.hasMany(models.Transaction, {onDelete: 'cascade'})
//         models.Budget.hasMany(models.BudgetMember, {onDelete: 'cascade'})
//         models.Budget.belongsTo(models.Currency)
//     }

//     return Budget
// }