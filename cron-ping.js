const cron = require('node-cron');
const getActiveAlerts = require('./controllers/actionAlert').getActiveAlerts;
const { Channel } = require('./models/channel');
const Plc = require("./models/plc").Plc;
const mongoose = require('mongoose');
const fetch = require('node-fetch');

const scheduleAlerts = () => {

    cron.schedule('* * * * *', async () => {
        let currentTime = new Date()
        console.log(currentTime.getHours())
        let alerts = await getActiveAlerts();
        // console.log(alerts)

        let turnOnAlerts = alerts.filter(
            a => a.timeStart.getHours() == currentTime.getHours() //&& a.timeStart.getMinutes() == turnOnAlerts.getMinutes()
        );

        let turnOffAlerts = alerts.filter(
            a =>
                a.timeEnd.getHours() == new Date().getHours()
                &&
                a.timeEnd.getMinutes() == new Date().getMinutes()
        )

        //console.log("turn onnnn", turnOnAlerts)
        alerts.forEach(a => {
            //  console.log('for each')
            //if (a.frequency == 'daily')
            //    console.log(a.frequency)
            //fetchSwitchOn(a);

            switch (a.frequency) {
                case 'once':
                    fetchSwitchOn(a);
                    break;
                case 'daily':
                    //console.log(a.frequency)
                    fetchSwitchOn(a);
                    break;
                case 'by days':
                    //if (a.days.findIndex(new Date().getDay()) != -1)
                    fetchSwitchOn(a);
                    break;

            }
        })


        turnOffAlerts.forEach(a => {
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
         console.log('plccccc',plc)
        await fetch(`http://d.zeitech.co.il/dz.cgi?channel=${7}&state=1&login=${plc.login}&token=${plc.token}`, requestOptions)
            .then(response => response.json())
            .then(result => { resu = result; console.log("result: ", result) })
            .catch(error => console.log('error', error));
    }
    return resu;
}


const fetchSwitchOff = async (alert) => {
    console.log('switch off!!!!!!!!!!!!!!!!!!!!')
    var requestOptions = {
        method: 'POST',
        redirect: 'follow'
    };
    let channel;
    let plc;
    if (alert.channelId) {

        channel = await fetchChannel(alert.channelId)
        plc = await fetchPlc(alert.userId)
        await fetch(`http://localhost:4500/channel/switchToOff?channel=${channel.channelNum}&login=${plc.login}&token=${plc.token}`, requestOptions)
            .then(response => response.json())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }

}
module.exports = { scheduleAlerts }