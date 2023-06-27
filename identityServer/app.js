const express = require('express');
const app = express();
const registerRoute = require('./routes/register');
const loginRoute = require('./routes/login');
const otpRoute = require('./routes/confirmOTP');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const bodyParser = require('body-parser');

app.use(express.json());
app.use(cookieParser());

app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: false, // Set to true if using HTTPS
        httpOnly: true,
      },
    })
  );

  
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/register', registerRoute);
app.use('/login', loginRoute);
app.use('/confirmOTP', otpRoute);



app.listen(3000);