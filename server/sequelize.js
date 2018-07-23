var path = require('path');
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
var config = require(path.join(__dirname, '.', 'config', 'config.js'))[env];

// database connection
const dbOptions = config || {
  database: 'greatron',
  username: 'greatron',
  password: 'greatron',
  host: 'localhost',
  dialect: 'mysql',
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

let sequelize = new Sequelize(dbOptions.database, dbOptions.username, dbOptions.password, dbOptions);

module.exports = {
  db: {
    sequelize,
    Sequelize
  }
};
