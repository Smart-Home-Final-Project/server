const cron = require('node-cron');
const getActiveAlerts = require('./controllers/actionAlert').getActiveAlerts;

const scheduleAlerts = () => {

    cron.schedule('* * * * *', async () => {
        console.log('schedule')
        console.log(new Date().getHours())
        let alerts = await getActiveAlerts();
        console.log(alerts)
        const turnOnAlerts = alerts.filter(
            a => a.timeStart.getHours() == new Date().getHours() && a.timeStart.getMinutes() == new Date().getMinutes()
        );
        console.log(turnOnAlerts);
        
        let turnOffAlerts = alerts.filter(
            a =>
                a.timeEnd.getHours() == new Date().getHours()
                &&
                a.timeEnd.getMinutes() == new Date().getMinutes()
        )
        console.log(turnOffAlerts);

        turnOnAlerts.forEach(a => {
            switch (a.frequency) {
                case 'once':
                    fetchSwitchOn(a);
                    break;
                case 'daily':
                    fetchSwitchOn(a);
                    break;
                case 'by days':
                    if (a.days.findIndex(new Date().getDay()) != -1)
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

    });
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

    fetch("localhost:4500/actionAlert/update", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}

const fetchSwitchOn = (alert) => {
    var requestOptions = {
        method: 'POST',
        redirect: 'follow'
    };

    fetch(`localhost:4500/channel/switchToOn/${alert._id}`, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}

const fetchSwitchOff = (alert) => {
    var requestOptions = {
        method: 'POST',
        redirect: 'follow'
    };

    fetch(`localhost:4500/channel/switchToOff/${alert._id}`, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}

module.exports = { scheduleAlerts }