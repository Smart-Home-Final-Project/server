const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const actionAlertRoute = require('./routes/actionAlert')
const userRoute = require('./routes/user')
const channelGroupRoute = require('./routes/ChannelGroup')
const plcRoute = require('./routes/plc')
const channelRoute = require('./routes/channel')
const { scheduleAlerts } = require('./cron-ping')

const app = express()
scheduleAlerts()

mongoose.connect("mongodb://localhost:27017/SmartHomeZeitech")
    .then(() => { console.log("mongo db connected"); })
    .catch(err => { console.log(err) });

app.use(cors())
app.use(express.json())
app.use("/user", userRoute)
app.use("/actionAlert", actionAlertRoute)
app.use('/ChannelGroup', channelGroupRoute)
app.use('/plc', plcRoute)
app.use('/channel', channelRoute)

app.listen(4500, () => { console.log("waiting") }) 
