module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('users', {
        // id: {
        //     type: Sequelize.STRING,
        //     primaryKey: true
        // },
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        confirmed_at: {
            type: Sequelize.DATE,
            defaultValue: new Date(0)
        },
        reset_send_at: { 
            type: Sequelize.DATE,
            defaultValue: new Date(0)
        }
    }, {timestamps: false})

    // User.associate = function(models){
    //     models.User.hasMany(models.Budget, { onDelete: 'cascade' })
    //     models.User.hasMany(models.BudgetMember, { onDelete: 'cascade' })
    // }

    return User
}