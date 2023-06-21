const express = require('express');
const app = express();
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const sgMail = require('@sendgrid/mail');
const loginController = require('../controllers/loginController');
const crypto = require('crypto');
dotenv.config();

app.use(express.json());

router.get('/', (req, res) => {
  res.sendFile('views/login.html', { root: 'public' });
});



const generateOTP = () => {
  const digits = 6; 
  const buffer = crypto.randomBytes(Math.ceil(digits / 2));
  let OTP = buffer.toString('hex');
  OTP = OTP.slice(0, digits);
  return OTP;
};


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

    if (!isPasswordValid) {
      return res.status(401).send('Invalid username or password');
    }

    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const OTP = generateOTP();
    console.log(OTP);

    const msg = {
        to: 'slpotgieter1@gmail.com', // Change to your recipient
        from: 'cooldude2233456@gmail.com', // Change to your verified sender
        subject: 'Here is your OTP',
        text: `Your OTP: ${OTP}`, 
    }

    req.session.otp = OTP;
    req.session.email = msg.to;
    req.session.username = username;
    /*
    sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent')
    })
  .catch((error) => {
    console.error(error)
  })

  */

  res.redirect('/confirmOTP');

  /*  
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
    */
    
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

module.exports = router;
