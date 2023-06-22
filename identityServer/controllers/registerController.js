const pool = require('../dbconnection/db');

const addUser = (userName, email, password) => {
    return new Promise((resolve, reject) => {
      pool.query(
        'INSERT INTO User (username, email, password) VALUES (?, ?, ?)',
        [userName, email, password],
        (error) => {
          if (error) {
            console.error('Error occurred when executing query: ', error);
            reject(error);
            return;
          }
          resolve(true);
        }
      );
    });
  };

  module.exports = {
    addUser,
  };