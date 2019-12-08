const env = {
    database: 'noowedb',
    username: 'noowedb',
    password: 'noowedb!',
    host: 'den1.mysql6.gear.host',
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    secret: 'mammamiapizzeria'
  }
   
  module.exports = env