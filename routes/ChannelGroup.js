const channelGroupRoute = require("express").Router();
const channelGroup = require('../controllers/channelGroup');

channelGroupRoute.get('/:id',channelGroup.getAllChanneslGroupsById)
channelGroupRoute.get('/:id',channelGroup.getChannelsGroupById)
channelGroupRoute.delete('/:id',channelGroup.deleteChannelsGroupById)
channelGroupRoute.post('',channelGroup.addChannelsGroup)
channelGroupRoute.put('/update/:id',channelGroup.updateChannelGroup)
channelGroupRoute.post('/swichToOn',channelGroup.switchToOnGroup)
channelGroupRoute.post('/swichToOff',channelGroup.switchToOffGroup)

module.exports = channelGroupRoute;
