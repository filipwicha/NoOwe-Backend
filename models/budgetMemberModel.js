// module.exports = (sequelize, Sequelize) => {
//     const BudgetMember = sequelize.define('budget_members', {
//         id: {
//             type: Sequelize.INTEGER,
//             primaryKey: true,
//             allowNull: false
//         },
//         nickname: {
//             type: Sequelize.STRING,
//             allowNull: false
//         },
//         user_id: {
//             type: Sequelize.INTEGER,
//             allowNull: true,
//             defaultValue: null,
//             references: 'users',
//             referencesKey: 'id'
//         },
//         budget_id: {
//             type: Sequelize.INTEGER,
//             allowNull: false,
//             references: 'budgets',
//             referencesKey: 'id'
//         }
//     })

//     BudgetMember.associate = function(models){
//         models.BudgetMember.hasMany(models.Share, {onDelete: 'cascade'})
//     }

//     return BudgetMember
// }