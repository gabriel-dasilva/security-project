const express = require('express');
const app = express();
const router = express.Router();

app.use(express.json());

router.get('/', (req, res) => {
  res.sendFile('views/index.html', { root: 'public' });
});

module.exports = router;
