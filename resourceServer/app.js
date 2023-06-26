const express = require('express');
const app = express();
const homepageRoute = require('./routes/homepage');
const blackjackMainPage = require('./routes/blackjackRoute');
const bodyParser = require('body-parser');

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/', homepageRoute);
app.use('/blackjack', blackjackMainPage);

app.listen(4000, () => {
    console.log(`Now listening on port 4000`);
}); 