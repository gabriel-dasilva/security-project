const mssql = require('mssql');
const pool = require('../dbconnection/db');

const addUser = (userName, password) => {
    return new Promise((resolve, reject) => {
      pool.request()
          .input('username', mssql.VarChar,userName)
          .input('password', mssql.VarChar, password)
          .query(
            'INSERT INTO User (username, password) VALUES (?, ?)',
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