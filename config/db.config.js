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
// db.budget = require('../models/budgetModel')(sequelize, Sequelize)
// db.budgetMember = require('../models/budgetMemberModel')(sequelize, Sequelize)
// db.transaction = require('../models/transactionModel')(sequelize, Sequelize)
// db.share = require('../models/shareModel')(sequelize, Sequelize)
// db.category = require('../models/categoryModel')(sequelize, Sequelize)
// db.currency = require('../models/currencyModel')(sequelize, Sequelize)

module.exports = db