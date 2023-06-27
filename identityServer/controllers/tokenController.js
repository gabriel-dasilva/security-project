const jwt = require('jsonwebtoken');

const generateAccessToken = (payload) => {
    return jwt.sign(
        payload,
        process.env.TOKEN_SECRET,
        {
            expiresIn: "2m"
        }
    );
}

module.exports = {
    generateAccessToken
};