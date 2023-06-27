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
        req.user = decoded;
      }
      else if (err.name == 'TokenExpiredError') {
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
    
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;