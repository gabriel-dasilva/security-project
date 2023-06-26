const express = require('express');
const app = express();
const router = express.Router();
const userController = require('../controllers/userController');

app.use(express.json());

router.get('/', (req, res) => {
  res.sendFile('views/homepage.html', { root: 'public' });
});

module.exports = router;
