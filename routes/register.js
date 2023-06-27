const express = require('express');
const app = express();
const router = express.Router();
const bcrypt = require('bcrypt');
const registerController = require('../controllers/registerController');

app.use(express.json());

// temp db, will need to connect to db

router.get('/', (req, res) => {
  res.sendFile('views/register.html', { root: 'public' });
});

router.post('/', async (req, res) => {
    try {
      const username = req.body.username;
      const password = req.body.password;
      const email = req.body.email;
      const confirmPassword = req.body.confirmPassword;

      console.log(password);
      console.log(confirmPassword);
  
      const minPasswordLength = 10;
      // Check if the password and confirm password match
      if (password !== confirmPassword) {
        return res.status(401).json({ error: 'Passwords do not match' });
      }
      // Check password length
      if (password.length < minPasswordLength) {
        return res.status(401).json({ error: `Password should be greater than ${minPasswordLength} characters`});
      }
  
      const salt = await bcrypt.genSalt();
      const hashedPass = await bcrypt.hash(password, salt);

      await registerController.addUser(username, email, hashedPass);
      await registerController.addUserBankroll(username);
      
      res.json({ success: true }); 
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  });
  
module.exports = router;
