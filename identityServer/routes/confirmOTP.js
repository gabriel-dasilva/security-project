const express = require('express');
const app = express();
const router = express.Router();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const loginController = require('../controllers/loginController');


app.use(express.json());

router.get('/', (req, res) => {
    // want to use the email value to display on the html page, but i am stuck...
    const OTP = req.session.otp;
    const email = req.session.email;
    // need to star out some of the chars for the email to display to user in a variable below
  
    const responseData = {
      email: email
    };
  
    res.sendFile('confirmOTP.html', { root: 'public/views' }); 
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