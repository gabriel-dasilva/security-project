const mssql = require('mssql');
const pool = require('../dbconnection/db');



const addUser = async (userName, email, password) => {
    const dbPool = await pool;

    try {
      const ps = new mssql.PreparedStatement(dbPool);
      
      ps.input('username', mssql.VarChar,userName);
      ps.input('password', mssql.VarChar, password);
      ps.input('email', mssql.VarChar, email);

      const stmt = 'INSERT INTO [User] (username, email,password) VALUES (@username, @email, @password)';

      await ps.prepare(stmt);
      await ps.execute({
        username: userName,
        email: email,
        password: password
      });
    } catch(err) {
      console.error(err);
    }
};

  module.exports = {
    addUser,
  };