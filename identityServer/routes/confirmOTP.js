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
    // function to star out the email address here*****
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
        console.log("Successful authentication") 
        const user = await loginController.getUserByUsername(username);
        const token = jwt.sign(
            {username: user.username},
            process.env.TOKEN_SECRET,
            {
              expiresIn: "1h"
            }
          );
      
          user.token = token;
          tokenValue = {
            'token': user.token,
            
          };
          res.status(200).send(tokenValue);
    }else{
        console.log("failed to log in!");
    }
      
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  });

module.exports = router;