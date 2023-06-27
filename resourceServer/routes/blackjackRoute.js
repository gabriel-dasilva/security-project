const express = require('express');
const app = express();
const router = express.Router();
const userController = require('../controllers/userController');
const verifyToken = require('../middleware/auth');

app.use(express.json());

router.post('/userBankRoll', async (req, res) => {
  console.log("Getting user bankroll")
  console.log(req.cookies.access_token);
  try {
    const username = req.body.username;     
    const userBankroll = await userController.getBankrollByUsername(username);
    res.status(200).send(userBankroll);    
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

router.post('/userBankRoll/update', async (req, res) => {
  console.log("Updating user bankroll")
  try {
    const username = req.body.username;     
    const bankroll = req.body.bankroll;
    await userController.updateUserBankRoll(username, bankroll);
    res.status(200).send('Success');    
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

module.exports = router;
