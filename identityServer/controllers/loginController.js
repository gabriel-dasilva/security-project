const mssql = require('mssql');
const pool = require('../dbconnection/db');



const getUserByUsername = async (userName) => {
    const dbPool = await pool;
    return await dbPool.request()
          .input('username', mssql.VarChar,userName)
          .query(
            'SELECT * FROM User WHERE username = @username',
            (error) => {
              if (error) {
                console.error('Error occurred when executing query: ', error);
                return;
              }
            }
          );
  };

  module.exports = {
    getUserByUsername,
  };