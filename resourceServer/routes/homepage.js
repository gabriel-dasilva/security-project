const express = require('express');
const app = express();
const router = express.Router();
const userController = require('../controllers/userController');
const verifyToken = require('../middleware/auth');

app.use(express.json());

router.get('/', verifyToken,(req, res) => {
  res.sendFile('views/homepage.html', { root: 'public' });
});

module.exports = router;
