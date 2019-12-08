const env = require('./env.js')
 
const Sequelize = require('sequelize')
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
 
  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle
  }
})
 
const db = {}
 
db.Sequelize = Sequelize
db.sequelize = sequelize
 
db.user = require('../models/userModel')(sequelize, Sequelize)
db.budget = require('../models/budgetModel')(sequelize, Sequelize)
db.budgetMember = require('../models/budgetMemberModel')(sequelize, Sequelize)
db.transaction = require('../models/transactionModel')(sequelize, Sequelize)
db.share = require('../models/shareModel')(sequelize, Sequelize)
db.category = require('../models/categoryModel')(sequelize, Sequelize)
db.currency = require('../models/currencyModel')(sequelize, Sequelize)

db.user.hasMany(db.budget,  {foreignKey: 'owner_id', onDelete: 'cascade' })  
db.budget.hasMany(db.transaction, {foreignKey: 'budget_id', onDelete: 'cascade' })
db.budget.hasMany(db.budgetMember, {foreignKey: 'budget_id', onDelete: 'cascade' })
db.budgetMember.hasMany(db.share, {foreignKey: 'member_id', onDelete: 'cascade' })
db.transaction.hasMany(db.share, {foreignKey: 'transaction_id', onDelete: 'cascade' })
db.currency.hasMany(db.budget, {foreignKey: 'currency_id', onDelete: 'cascade' })
db.category.hasMany(db.transaction, {foreignKey: 'category_id', onDelete: 'cascade' })

module.exports = db