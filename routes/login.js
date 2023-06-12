const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json();
})

router.post('/', (req, res) => {
    //TODO: get data from the form and becrypt (salt and pepper)
    // to store in the database
})