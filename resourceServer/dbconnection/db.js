const mssql = require('mssql');
const dotenv = require('dotenv');

dotenv.config({ path: require('find-config')('.env') });

const config = {
  database: process.env.SQL_DATABASE,
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  server: process.env.SQL_SERVER,
  options: {
    trustServerCertificate: process.env.SQL_TRUST_SERVER === 'true'
  }
} 

const pool = new mssql.ConnectionPool(config).connect();

module.exports = pool;