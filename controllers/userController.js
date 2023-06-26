const mssql = require('mssql');
const pool = require('../dbconnection/db');


const getBankrollByUsername = async (userName) => {
    const dbPool = await pool;
    const result = await dbPool.request()
          .input('username', mssql.VarChar, userName)
          .output('bankroll')
          .execute('spUser_GetBankroll');
    
    console.log('Result: ' + result.output.bankroll);
    return result.output.bankroll;
};

const updateUserBankRoll = async (username, bankroll) => {
  const dbPool = await pool;
  try {
    const ps = new mssql.PreparedStatement(dbPool);
    
    ps.input('username', mssql.VarChar, username);
    ps.input('bankroll', mssql.Money, bankroll);

    const stmt = 'UPDATE dbo.UserWinnings SET bankroll=@bankroll where username=@username;';

    await ps.prepare(stmt);
    await ps.execute({
      username: username,
      bankroll: bankroll
    });
  } catch(err) {
    console.error(err);
  }
}

module.exports = {
  getBankrollByUsername,
  updateUserBankRoll
};