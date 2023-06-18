const express = require('express');
const app = express();
const registerRoute = require('./routes/register');
const loginRoute = require('./routes/login');

const bodyParser = require('body-parser');

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/register', registerRoute);
app.use('/login', loginRoute);



app.listen(3000);