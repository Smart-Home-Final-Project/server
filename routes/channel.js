const router = require('express').Router();
const channelController = require('../controllers/channel')

router.delete('/:id',channelController.deleteChannelById)
router.post('/',channelController.addChannel)
router.get('/switchToOn', channelController.switchToOn)
router.get('/switchToOff', channelController.switchToOff)
router.get('/all',channelController.getAllChannelsByPlcId)
router.get('/:channelId',channelController.getChannelById)
router.put('/update',channelController.updateChannel)
router.put('/update/:id',channelController.updateChannelById)

module.exports = router
