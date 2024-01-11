// Configuration settings
const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    'locallens_db',
    'root',
    'Joseph12102003$',
    {
      host: 'localhost',
      dialect: 'mysql',
      password: 'password',
      port: 3306
    }
  );
}


module.exports = sequelize;
