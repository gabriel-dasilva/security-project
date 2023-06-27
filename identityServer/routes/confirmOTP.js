const express = require('express');
const app = express();
const router = express.Router();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const loginController = require('../controllers/loginController');
const tokenController = require('../controllers/tokenController');


app.use(express.json());

function maskEmail(email) {
  const atIndex = email.indexOf('@');
  if (atIndex > 1) {
    const username = email.substring(0, atIndex);
    const maskedUsername = username.slice(0, 2) + '*'.repeat(username.length - 2);
    const domain = email.substring(atIndex);
    return maskedUsername + domain;
  }
  return email;
}

router.get('/', (req, res) => {
    const OTP = req.session.otp;
    const email = req.session.email;
    let maskedEmail = maskEmail(email);
    res.json({maskedEmail});

  });

  router.post('/', async (req, res) => {
    try {
      const OTPInput = req.body.otp;
      const OTP = req.session.otp;
      const username = req.session.username;

      if (OTPInput == OTP) {
        const user = await loginController.getUserByUsername(username);
        const accessToken = tokenController.generateAccessToken({username: user.username});
        
        const refreshToken = jwt.sign(
          {username: user.username},
          process.env.REFRESH_TOKEN_SECRET
        );
        
        await loginController.updateUser(username, refreshToken);
        const fifteenMinutes = 15 * 60 * 1000;
        const expiryDate = new Date(Date.now() + fifteenMinutes);
    
        res.cookie('token', accessToken, {
          expires: expiryDate,
          httpOnly: true
        });

        res.cookie('refreshToken', refreshToken, {
          expires: expiryDate,
          httpOnly: true
        });


        res.cookie('username', user.username, {
          expires: expiryDate,
          httpOnly: false
        });
        res.redirect('http://localhost:8080/');
    }else{
        console.log("failed to log in!");
    }
      
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  });

module.exports = router;