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
    const user = await loginController.getUserByUsername(username);
    console.log(user);

    if (user == undefined) {
      console.log('this should execute');
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    else {
      const email = user.email;
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }
      sgMail.setApiKey(process.env.SENDGRID_API_KEY)
      const OTP = generateOTP();
      console.log(OTP);
  
      const msg = {
          to: email, 
          from: process.env.SENDGRID_EMAIL_ADDRESS, 
          subject: 'YOUR OTP',
          text: `OTP: ${OTP}`, 
      }
  
      req.session.otp = OTP;
      req.session.email = email;
      req.session.username = username;

      //IF UNCOMMENTED, IT WILL SEND AN EMAIL TO THE ABOVE ADDRESS
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

      //res.redirect('http://localhost:3000/views/confirmOTP.html');
      res.json({ success: true }); // Send a success response
    }
    
    
  } catch (error) {
    console.error(error);
    res.status(500).send('500: something went wrong');
  }
});

module.exports = router;
