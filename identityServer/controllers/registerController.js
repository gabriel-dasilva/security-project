const mssql = require('mssql');
const pool = require('../dbconnection/db');



const addUser = async (userName, email, password) => {
    const dbPool = await pool;
    return await dbPool.request()
          .input('username', mssql.VarChar,userName)
          .input('password', mssql.VarChar, password)
          .query(
            'INSERT INTO [User] (username, password) VALUES (@username, @password)',
            (error) => {
              if (error) {
                console.error('Error occurred when executing query: ', error);
                return;
              }
            }
        );
  };

  module.exports = {
    addUser,
  };