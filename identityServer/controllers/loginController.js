const pool = require('../dbconnection/db');



const getUserByUsername = (userName) => {
    return new Promise((resolve, reject) => {
      pool.query(
        'SELECT * FROM User WHERE username = ?',
        [userName],
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