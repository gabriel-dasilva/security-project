const express = require('express');
const app = express();
const router = express.Router();
const bcrypt = require('bcrypt');
const registerController = require('../controllers/registerController');

app.use(express.json());

// temp db, will need to connect to db
const users = [];

router.get('/', (req, res) => {
  res.sendFile('views/register.html', { root: 'public' });
});

router.post('/', async (req, res) => {
    try {
      const username = req.body.username;
      const password = req.body.password;
      const confirmPassword = req.body.confirmPassword;
  
      // Check if the password and confirm password match
      if (password !== confirmPassword) {
        return res.status(400).send('Passwords do not match');
      }
  
      const salt = await bcrypt.genSalt();
      const hashedPass = await bcrypt.hash(password, salt);
  
      //const user = { name: username, password: hashedPass };
      //users.push(user);

      await registerController.addUser(username, hashedPass);

      res.status(201).send('success');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  });
  
module.exports = router;
