const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// get config vars
dotenv.config();
process.env.TOKEN_SECRET;

function authenticateToken(req, res, next) {
    try {
      const authHeader = req.headers['authorization']
      const token = authHeader && authHeader.split(' ')[1]
    
      if (token == null) return res.sendStatus(401)
      jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        console.log(err)
    
        if (err) return res.sendStatus(403)
    
        req.user = user
    
        next()
      })}
      catch(err){
        return res.status(401).send(err);
      }
    }

    module.exports = { authenticateToken}
