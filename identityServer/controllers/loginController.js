const mssql = require('mssql');
const pool = require('../dbconnection/db');



const getUserByUsername = async (userName) => {
    const dbPool = await pool;

    try {
      const ps = new mssql.PreparedStatement(dbPool);
      ps.input('username', mssql.VarChar,userName);
      
      const stmt = 'SELECT * FROM [User] WHERE username = @username';

      await ps.prepare(stmt);
      const result = await ps.execute({username: userName});

      return result.recordset[0];
    } catch (err) {
      console.error(err);
    }
    
    
  };

  const updateUser = async (username ,refreshToken) => {
    const dbPool = await pool;
    try {
      const ps = new mssql.PreparedStatement(dbPool);
      
      ps.input('refreshToken', mssql.VarChar, refreshToken);
      ps.input('username', mssql.VarChar, username);
  
      const stmt = 'UPDATE [User] SET refreshToken=@refreshToken where username=@username;';
  
      await ps.prepare(stmt);
      await ps.execute({
        username: username,
        refreshToken: refreshToken
      });
    } catch(err) {
      console.error(err);
    }
}

  module.exports = {
    getUserByUsername,
    updateUser
  };