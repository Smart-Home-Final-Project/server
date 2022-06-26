const router = require('express').Router();
const actionAlertController = require('../controllers/actionAlert')

router.get('/:id', actionAlertController.getAllActionAlertsById)
router.get('/', actionAlertController.getActiveAlerts)
router.post('/add', actionAlertController.addActionAlert);
router.put('/update/:id', actionAlertController.updateActionAlert);
router.delete('/:id', actionAlertController.deleteActionAlertById)

module.exports = router
