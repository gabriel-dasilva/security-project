const pool = require('../dbconnection/db');

const addUser = (userName, password) => {
    return new Promise((resolve, reject) => {
      pool.query(
        'INSERT INTO User (username, password) VALUES (?, ?)',
        [userName, password],
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