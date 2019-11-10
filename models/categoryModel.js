module.exports = (sequelize, Sequelize) => {
    const Category = sequelize.define('categories', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false
        }
    }, {timestamps: false})

    return Category
}