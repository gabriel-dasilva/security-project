const express = require('express');
const app = express();
const router = express.Router();
const bcrypt = require('bcrypt');
const loginController = require('../controllers/loginController');

app.use(express.json());

router.get('/', (req, res) => {
  res.sendFile('views/login.html', { root: 'public' });
});

router.post('/', async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    // Retrieve the user record from the database
    const user = await loginController.getUserByUsername(username);

    if (user === undefined) {
        console.log('it should execute the if statemnt')
      return res.status(401).send('Invalid username or password');
    }

    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log('is the password valid: '+isPasswordValid);

    if (!isPasswordValid) {
      return res.status(401).send('Invalid username or password');
    }

    res.status(200).send('Login successful');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

module.exports = router;
