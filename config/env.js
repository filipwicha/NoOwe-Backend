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
  secret: 'mammamiapizzeria',
  mail: 'homeofficernoreply@gmail.com',
  mailpassword: 'HomeOfficer1!'
}

module.exports = env


  //homeofficernoreply@gmail.com HomeOfficer1!
  //$2a$08$upNdUbXY/Gne9JKKQqslD.Eityez1gPFyc/j9/uUFekHpCcqiszlK <- password for test