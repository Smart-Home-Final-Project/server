const router = require('express').Router();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// get config vars
dotenv.config();
process.env.TOKEN_SECRET;
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
  
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      console.log(err)
  
      if (err) return res.sendStatus(403)
  
      req.user = user
  
      next()
    })
  }
const plcController = require('../controllers/plc')

router.get('/',authenticateToken, plcController.getAllPlcs)
router.get('/user/:id',authenticateToken, plcController.getPlcByUserId)
router.get('/:id',authenticateToken, plcController.getPlcById)
router.post('/',authenticateToken, plcController.addPlc);
router.delete('/:id',authenticateToken, plcController.deletePlcById);
router.put('/update/:id',authenticateToken, plcController.updatePlc);

module.exports = router