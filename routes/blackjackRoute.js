const express = require('express');
const app = express();
const router = express.Router();
const jwt = require('jsonwebtoken');
const userController = require('../controllers/userController');
const verifyToken = require('../middleware/auth');

app.use(express.json());

router.get('/', (req, res) => {
  const token = req.cookies.token;
  console.log(token);
  
  if (!token) {
    return res.redirect('https://9hhswbztrc.us-east-1.awsapprunner.com/login');
  }

  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) {
      console.log('Here');
      console.log(err);
      return res.redirect('https://9hhswbztrc.us-east-1.awsapprunner.com/login');
    }
    
    res.sendFile('views/blackjack.html', { root: 'public' });
  });

  res.sendFile('views/blackjack.html', { root: 'public' });
});

router.post('/userBankRoll', async (req, res) => {
  console.log("Getting user bankroll")
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
