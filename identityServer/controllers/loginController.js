const pool = require('../dbconnection/db');



const getUserByUsername = (userName) => {
    return new Promise((resolve, reject) => {
      pool.request()
          .input('username', mssql.VarChar,userName)
          .query(
            'SELECT * FROM User WHERE username = ?',
            (error, results) => {
              if (error) {
                console.error('Error occurred when executing query: ', error);
                reject(error);
                return;
              }
              resolve(results[0]); 
            }
          );
    });
  };

  module.exports = {
    getUserByUsername,
  };