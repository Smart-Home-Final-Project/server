const channelGroupRoute = require("express").Router();
const channelGroup = require('../controllers/channelGroup');

channelGroupRoute.get('/:id',channelGroup.getAllChanneslGroupsById)
channelGroupRoute.get('/:id',channelGroup.getChannelsGroupById)
channelGroupRoute.delete('/:id',channelGroup.deleteChannelsGroupById)
channelGroupRoute.post('',channelGroup.addChannelsGroup)
channelGroupRoute.put('/update/:id',channelGroup.updateChannelGroup)
//channelGroupRoute.post('/swichToOn/:id',channelGroup.swichGroupToOn)
//channelGroupRoute.post('/swichToOff/:id',channelGroup.swichGroupToOff)

module.exports = channelGroupRoute;
