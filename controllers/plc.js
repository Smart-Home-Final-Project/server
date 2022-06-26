const Plc = require("../models/plc").Plc;
const mongoose=require('mongoose');

//post
const addPlc = async (req, res) => {
    let plc = new Plc(req.body);
    try {
        await plc.save();
        return res.send(plc);
    }
    catch (err) {
        return res.status(400).send(err);
    }
}

//put
const updatePlc = async (req, res) => {
    const { id } = req.params;
    const plc = req.body;

    try {
        let p;
        p = await Plc.findByIdAndUpdate(id, plc)
        p = await Plc.findById(id)
        return res.send(p)
    }
    catch (error) {
        return res.status(400).send(error)
    }
}

//delet
const deletePlcById = async (req, res) => {
    let plcId = req.params.id;
    try {
        let plc = await Plc.findByIdAndDelete(plcId)
        return res.send(plc);
    }
    catch (err) {
        return res.status(400).send(err);
    }
}
//get
const getAllPlcs = async (req, res) => {
    try {
        const plcs = await Plc.find({});
        return res.status(200).send(plcs);
    }
    catch (e) {
        return res.status(400).send(e);
    }
}
//get 
const getPlcByUserId = async (req, res) => {
    let id = req.params.id;
    try {
        let plc = await Plc.find({userId:mongoose.Types.ObjectId(id)})
        return res.send(plc);
    }
    catch (err) {
        return res.status(400).send(err)
    }
}
//get
const getPlcById = async (req, res) => {
    let plcId = req.params.id;
    try {
        let plc = await Plc.findById(plcId);
        return res.send(plc);
    }
    catch (err) {
        return res.status(400).send(err)
    }
}

module.exports = {
    addPlc,
    deletePlcById,
    getPlcById,
    getAllPlcs,
    getPlcByUserId,
    updatePlc
}