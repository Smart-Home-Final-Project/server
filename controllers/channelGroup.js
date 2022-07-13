const ChannelGroup = require("../models/channelGroup").Channelgroup;
const mongoose = require('mongoose');
const { switchToOnApi, switchToOffApi } = require("./swichApi");

//Get all Channels groups
const getAllChanneslGroupsById = async (req, res) => {
    let { id } = req.params;
    try {
        let group = await ChannelGroup.find({ userId: mongoose.Types.ObjectId(id) });
        console.log(group)
        return res.send(group);
    }
    catch (error) {
        return res.status(400).send(error);
    }
}
//Get Channels group by id
const getChannelsGroupById = async (req, res) => {
    let groupId = req.params.id;
    try {
        let group = await ChannelGroup.findById(groupId);
        return res.send(group);
    }
    catch (error) {
        return res.status(400).send(error);
    }
}
//Add Channels group
const addChannelsGroup = async (req, res) => {
    let group = new ChannelGroup(req.body);
    try {
        await group.save();
        return res.send(group);
    }
    catch (error) {
        return res.status(400).send(error);
    }
}

//put
const updateChannelGroup = async (req, res) => {
    const { id } = req.params;
    const group = req.body;
    console.log("ggg", group)

    try {
        let g;
        g = await ChannelGroup.findByIdAndUpdate(id, group)
        g = await ChannelGroup.findById(id)
        return res.send(g)
    }
    catch (error) {
        return res.status(400).send(error)
    }
}

//Delete Channels group by id
const deleteChannelsGroupById = async (req, res) => {
    let groupId = req.params.id;
    try {
        let group = await ChannelGroup.findByIdAndDelete(groupId);
        return res.send(group);
    }
    catch (error) {
        return res.status(400).send(error);
    }
}


const switchToOnGroup = async (req, res) => {
    const channels =  req.body;
    let response = {};
    channels.forEach(async (item,index) => {
        let { channel, login, token } = item;
        response = await switchToOnApi(channel, login, token);
        if(index===channels.length-1){
            res.status(response.status).send(response.response);
        }
    });
    // res.status(response.status).send(response.response);
}

//get

const switchToOffGroup = async (req, res) => {
    const channels =  req.body;
    let response = {};
    channels.forEach(async (item,index) => {
        let { channel, login, token } =item;
        response = await switchToOffApi(channel, login, token);
        if(index===channels.length-1){
            res.status(response.status).send(response.response);
        }
    });
    // res.status(response.status).send(response.response);
}

//אין לנו עדין קבוצות בשרת של צייטק, נוסיף פונקציות אלו בהמשך
//Swich Channels group to on
// const swichGroupToOn = async (req, res) => {
//     const group = req.params.id;
//     const { login, token } = req.body;
//     try {
//       const result = await fetch(`http://d.zeitech.co.il/dz.cgi?group=${group}&state=1&login=${login}&token=${token}`, {
//             method: 'POST',
//             body: JSON.stringify(todo),
//             headers: { 'Content-Type': 'application/json' }
//         }).then(res => res.json())
//             .then(json => console.log(json));
//             res.send(result);
//     }
//     catch(err){
//         res.status(400).send(err);
//     }
// }

// //Swich Channels group to off
// const swichGroupToOff = async (req, res) => {
//     //how to do?
// }
module.exports = {
    getAllChanneslGroupsById,
    getChannelsGroupById,
    addChannelsGroup,
    deleteChannelsGroupById,
    updateChannelGroup,
    switchToOnGroup,
    switchToOffGroup
}