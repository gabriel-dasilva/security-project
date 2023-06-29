const express = require('express');
const app = express();
const router = express.Router();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const loginController = require('../controllers/loginController');


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
      console.log('Confirm OTP username: ' + username);
      if (OTPInput == OTP) {
        const user = await loginController.getUserByUsername(username);
        const token = jwt.sign(
            {username: user.username},
            process.env.TOKEN_SECRET,
            {
              expiresIn: "1h"
            }
          );

          const fifteenMinutes = 15 * 60 * 1000;
          const expiryDate = new Date(Date.now() + fifteenMinutes);
      
          user.token = token;
          res.cookie('token', token, {
            expires: expiryDate,
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            path: '/'          
          });
          res.cookie('username', user.username, {
            expires: expiryDate,
            httpOnly: false,
            secure: true,
            sameSite: 'none',
            path: '/'            
          });
          res.redirect('https://abrzgdhmf3.us-east-1.awsapprunner.com/blackjack');
    }else{
        console.log("failed to log in!");
    }
      
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  });

module.exports = router;