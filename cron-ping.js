const cron = require('node-cron');
const getActiveAlerts = require('./controllers/actionAlert').getActiveAlerts;
const { Channel } = require('./models/channel');
const Plc = require("./models/plc").Plc;
const mongoose = require('mongoose');
const fetch = require('node-fetch');
const { turnOnrequest, turnOffrequest } = require('./controllers/swichApi');

const scheduleAlerts = () => {

    cron.schedule('* * * * *', async () => 
    {
        let currentTime = new Date()
        console.log(currentTime.getHours())
        let alerts = await getActiveAlerts();
        console.log(alerts.map(s=>s.timeStart));
        let turnOnAlerts = alerts.filter(
            a => {console.log("filter",a.timeStart); 
            return new Date(a.timeStart.toString()).getHours() === currentTime.getHours() 
             && new Date(a.timeStart).getMinutes() === currentTime.getMinutes()
            });

        let turnOffAlerts = alerts.filter(
            a =>
                new Date(a.timeEnd).getHours() == new Date().getHours()
                &&
                new Date(a.timeEnd).getMinutes() == new Date().getMinutes()
        )

        console.log("turn onnnn", turnOnAlerts)
        console.log("turn off", turnOffAlerts)
        turnOnAlerts.forEach(a => {
            //  console.log('for each')
            //if (a.frequency == 'daily')
            //    console.log(a.frequency)
            //fetchSwitchOn(a);
            console.log("alert ",a)
            switch (a.frequency) {
                case 'once':
                    fetchSwitchOn(a);
                    break;
                case 'daily':
                    //console.log(a.frequency)
                    fetchSwitchOn(a);
                    break;
                case 'by days':
                    if (a.days.findIndex(currentTime.getDay()) != -1)
                    fetchSwitchOn(a);
                    break;

            }
        })


        turnOffAlerts.forEach(a => {
            console.log("off alert",a)
            switch (a.frequency) {
                case 'once':
                    fetchSwitchOff(a);
                    a.status = false;
                    updateAlert(a);
                    break;
                case 'daily':
                    fetchSwitchOff(a);
                    break;
                case 'by days':
                    if (a.days.findIndex(new Date().getDay()) != -1)
                        fetchSwitchOff(a);
                    break;

            }
        })
    })
}

const updateAlert = (alert) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(alert);

    var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch(`http://localhost:4500/actionAlert/update${alert._id}`, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}


const fetchSwitchOn = async (alert) => {
    //console.log('switch on!!!!!!!!!!!!!!!!!!!!', alert)
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    let plcs;
    let plc
    let resu;
    if (alert.idChannel) {
        //console.log("alert", alert.idChannel.toString())

        channel = await Channel.findById(alert.idChannel.toString())
        plcs = await Plc.find({ userId: mongoose.Types.ObjectId('62d6bd907546aad8a5a93048') })//alert.userId
        plc = plcs[0]
        let result = await turnOnrequest(channel.channelNum, plc.login, plc.token);
        if(result===200){
            channel.status=true;
            await Channel.findByIdAndUpdate(alert.idChannel, channel)
        }
    }
    return resu;
}


const fetchSwitchOff = async (alert) => {
    console.log('switch off!!!!!!!!!!!!!!!!!!!!')
    let channel;
    let plc;
    console.log(alert);
    if (alert.idChannel) {

        channel = await Channel.findById(alert.idChannel.toString())
        plcs = await Plc.find({ userId: mongoose.Types.ObjectId('62d6bd907546aad8a5a93048') })//alert.userId
        plc = plcs[0]
        let result = await turnOffrequest(channel.channelNum, plc.login, plc.token);
        console.log(result);
        if(result===200){
            channel.status=false;
            await Channel.findByIdAndUpdate(alert.idChannel, channel)
        }
    }

}
module.exports = { scheduleAlerts }