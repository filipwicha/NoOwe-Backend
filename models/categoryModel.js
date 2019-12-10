module.exports = (sequelize, Sequelize) => {
    const Category = sequelize.define('categories', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        photo: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {timestamps: false})

    return Category
}