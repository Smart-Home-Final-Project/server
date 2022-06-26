const router = require('express').Router();
const plcController = require('../controllers/plc')

router.get('/', plcController.getAllPlcs)
router.get('/user/:id', plcController.getPlcByUserId)
router.get('/:id', plcController.getPlcById)
router.post('/', plcController.addPlc);
router.delete('/:id', plcController.deletePlcById);
router.put('/update/:id', plcController.updatePlc);

module.exports = router