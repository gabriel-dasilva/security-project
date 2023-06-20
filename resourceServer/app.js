const express = require('express');
const app = express();
const testRoute = require('./routes/test');

const bodyParser = require('body-parser');

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/', testRoute);

app.listen(4000, () => {
    console.log(`Now listening on port 4000`);
}); 