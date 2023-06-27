const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
const fetch = require('node-fetch');

dotenv.config();

const verifyToken = async (req, res, next) => {
  const token = req.cookies.token
  const refreshToken = req.cookies.refreshToken;
  const username = req.cookies.username;


  if (!token) {
    return res.redirect('http://localhost:3000/views/login.html');
    // return res.status(403).send("Not allowed to make request");
  }
  try {

    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
      if (!err){
        console.log("err", err);
        console.log('Not expired');
        req.user = decoded;
      }
      else if (err.name == 'TokenExpiredError') {
        console.log('expired');
        console.log('username', username);
        const options = {
          method: 'POST',
          body: JSON.stringify({
            username
          }),
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${refreshToken}`
          },
          
        };
        
        const newToken = await fetch('http://localhost:3000/token', options);
  
        req.cookies.token = (await newToken.json()).AccessToken;
      } else {
        return res.status(401).send("Invalid Token");
      }
    })
    /*

    if (Date.now() >= exp * 1000) {
      console.log('Not expired');
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
      req.user = decoded;
      console.log('under');
    } else {
      console.log('expired');
      const body = {
        username: req.cookies.username,
        refreshToken: req.cookies.refreshToken
      }
      const options = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${refreshToken}`
        },
        body: JSON.stringify({
          username: username
        })
      };
      console
      const newToken = await fetch('http://localhost:3000/token', options);

      console.log("new token", newToken);
      req.cookies.token = newToken;
    }
    */
    
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;