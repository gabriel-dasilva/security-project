const express = require('express');
const app = express();
const router = express.Router();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const loginController = require('../controllers/loginController');
const tokenController = require('../controllers/tokenController');


app.use(express.json());

router.post('/', async (req, res) => {
    
	const authHeader = req.headers.authorization

	const username = req.body.username;
	const token = authHeader.split(' ')[1];
	
	
	if(token == null){
		res.json({ message: 'Invalid refresh token'});
	}
	
	const user = await loginController.getUserByUsername(username);

	if(user.refreshToken != token){
		res.json({ message: 'Forbidden' });
	}
	
	jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err,payload) => {
		if(err){
			res.json({ message: 'Some error occured' });
		}
		else{
			const accessToken = tokenController.generateAccessToken({ username: username });
			res.json({ AccessToken: accessToken , message: 'This is your new access token'});
		}
	});
});

module.exports = router;