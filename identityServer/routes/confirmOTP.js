const express = require('express');
const app = express();
const router = express.Router();


app.use(express.json());

router.get('/', (req, res) => {
    const OTP = req.session.otp;
    const email = req.session.email;
    console.log(OTP);
    console.log(email);
    res.sendFile('views/confirmOTP.html', { root: 'public' });

  });


module.exports = router;