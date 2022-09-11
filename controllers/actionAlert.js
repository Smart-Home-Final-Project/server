const { ActionAlert } = require("../models/actionAlert")
const mongoose=require('mongoose')

const addActionAlert = async (req, res) => {
    let alert = new ActionAlert(req.body)
    console.log("timr",alert.timeStart)
    try {
        await alert.save()
        return res.send(alert)
    }
    catch (err) {
        res.status(400).send(err)
    }
}
//put
const updateActionAlert = async (req, res) => {
    const { id } = req.params;
    const alert = req.body;
    try {
        let a = await ActionAlert.findByIdAndUpdate(id, alert)
        return res.send(a)
    }
    catch (error) {
       return res.status(400).send(error)
    }
}

const deleteActionAlertById = async (req, res) => {
    const { id } = req.params;
    try {
        let a = await ActionAlert.findByIdAndDelete(id);
        return res.send(a)
    }
    catch (error) {
        return res.status(400).send(error)
    }
}

const getAllActionAlertsById = async (req, res) => {
    let { id } = req.params;
    try {
        let user = await ActionAlert.find({ userId: mongoose.Types.ObjectId(id) })
        return res.send(user)
    }
    catch (err) {
        return res.status(400).send()
    }
}

const getActiveAlerts = async (req, res) => {
    try {
       return ActionAlert.find({ status: true })
    }
    catch (error) {
        console.log(error)
        // res.status(400).send(error);
    }
}

module.exports = {
    addActionAlert, updateActionAlert, deleteActionAlertById, getAllActionAlertsById, getActiveAlerts
}
