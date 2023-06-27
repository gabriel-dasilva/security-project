const express = require('express');
const app = express();
const router = express.Router();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const userController = require('../controllers/userController');
const verifyToken = require('../middleware/auth');

app.use(express.json());

router.get('/', verifyToken, (req, res) => {
  const token = req.cookies.token;
  console.log(token);
  
  if (!token) {

    return res.redirect('http://localhost:3000/views/login.html');
  }
    
  res.sendFile('views/homepage.html', { root: 'public' });

});

module.exports = router;
