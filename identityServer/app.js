const express = require('express');
const app = express();
const loginRoutes = require('./routes/register');
const bodyParser = require('body-parser');

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/register', loginRoutes);



app.listen(3000);