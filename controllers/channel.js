const { Channel } = require('../models/channel');
const fetch = require('node-fetch');
const { isObjectIdOrHexString } = require('mongoose');
const mongoose = require("mongoose");
const { switchToOffApi, switchToOnApi } = require('./swichApi');


//post

//delete
const deleteChannelById = async (req, res) => {
    let channelId = req.query.id;
    try {
        let channel = await Plc.findByIdAndDelete(channelId)
        return res.send(channel);
    }
    catch (err) {
        return res.status(400).send(err);
    }
}
//get
const getAllChannelsByPlcId = async (req, res) => {
    let id = req.query.id;
    console.log("id:" + id)
    try {
        let Allchannel = await Channel.find({ plcId: mongoose.Types.ObjectId(id) })
        return res.send(Allchannel);
    }
    catch (err) {
        return res.status(400).send(err);
    }
}
//get
const getChannelById = async (req, res) => {
    let id = req.params.id;
    try {
        let channel = await Channel.findById(id)
        return res.send(channel);
    }
    catch (err) {
        return res.status(400).send(err);
    }
}

//get
const switchToOn = async (req, res) => {
    let { channel, login, token } = req.query;
    const response =await switchToOnApi(channel, login, token,res)
    res.status(response.status).send(response.response);
}


//get

const switchToOff = async (req, res) => {
    let { channel, login, token } = req.query;
    const response = await switchToOffApi(channel, login, token,res);
    res.status(response.status).send(response.response);
}




//put
const updateChannelById = async (req, res) => {
    const { id } = req.params;
    const channel = req.body;

    try {
        let p;
        p = await Channel.findByIdAndUpdate(id, channel)
        p = await Channel.findById(id)
        return res.send(p)
    }
    catch (error) {
        return res.status(400).send(error)
    }
}

//put
const updateChannel = async (req, res) => {
    const channels = req.body;
    try {
        const channelsToUpdates = channels.map(channel=>({updateOne:{"filter" : { "_id" : channel._id },"update" :channel }}));
        channelUpdate = await Channel.bulkWrite(channelsToUpdates);
        const ids = channels.map(channel=>mongoose.Types.ObjectId(channel._id));
        channelUpdate = await Channel.find({'_id': { $in: ids}})
        return res.send(channelUpdate)
    }
    catch (error) {
        return res.status(400).send(error)
    }
}

// const addChannel = async (req, res) => {
//     let newChannel = new Channel(req.body);
//     console.log(newChannel)
//     try {
//         await newChannel.save();
//         return res.send(newChannel);
//     }
//     catch {
//         return res.status(400).send(err);
//     }

// }

const addChannel = async (req, res) => {
    const channels = req.body;
    try {
        const channelsToUpdates = channels.map(channel=>({insertOne :{"document" :channel }}));
        channelUpdate = await Channel.bulkWrite(channelsToUpdates);
        const ids = Object.values(channelUpdate?.insertedIds).map(item=>mongoose.Types.ObjectId(item._id));
        // const ids = channels.map(channel=>mongoose.Types.ObjectId(channel._id));
        channelUpdate = await Channel.find({'_id': { $in: ids}})
        return res.send(channelUpdate)
    }
    catch (error) {
        return res.status(400).send(error)
    }
}

module.exports = {
    addChannel,
    deleteChannelById,
    getAllChannelsByPlcId,
    getChannelById,
    switchToOn,
    switchToOff,
    updateChannel,
    updateChannelById
}