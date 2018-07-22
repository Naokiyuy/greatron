const Sequelize = require('sequelize');
const ProductModel = require('./api/product/models/Product');

// database connection
const dbOptions = {
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

const Product = ProductModel(sequelize, Sequelize);
sequelize.sync({force: true})
  .then(() => {
    console.log(`Database & tables created!`)
  });

module.exports = {
  Product
};
