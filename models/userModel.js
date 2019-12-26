module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('users', {
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

    return User
}