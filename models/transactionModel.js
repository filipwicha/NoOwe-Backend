// module.exports = (sequelize, Sequelize) => {
//     const Transaction = sequelize.define('transactions', {
//         id: {
//             type: Sequelize.INTEGER,
//             primaryKey: true,
//             allowNull: false
//         },
//         title: {
//             type: Sequelize.STRING,
//             allowNull: false
//         },
//         date: {
//             type: Sequelize.DATE,
//             allowNull: false
//         },
//         budget_id: {
//             type: Sequelize.INTEGER,
//             references: 'budgets',
//             referencesKey: 'id'
//         },
//         category_id: { 
//             type: Sequelize.INTEGER,
//             allowNull: false,
//             references: 'categories',
//             referencesKey: 'id'
//         }
//     })

//     Transaction.associate = function(models){
//         models.Transaction.hasMany(models.Share, {onDelete: 'cascade'})
//         models.Transaction.belongsTo(models.Category)
//     }

//     return Transaction
// }