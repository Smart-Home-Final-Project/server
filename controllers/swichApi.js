const { Channel } = require('../models/channel');
const fetch = require('node-fetch');
const { isObjectIdOrHexString } = require('mongoose');
const mongoose = require("mongoose");

const turnOffrequest  = async(channel,login,token)=>{
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    return fetch(`http://d.zeitech.co.il/dz.cgi?channel=${channel}&state=0&login=${login}&token=${token}`, requestOptions)
    .then(response => response.json())
    .then(result => r = result)
    .catch(error => console.log('error', error));
}
const switchToOffApi = async (channel, login, token,res ) => {
    try {
        let resu;
      

        let r =await turnOffrequest(channel, login, token)
        return {status:200,response:r}
    }
    catch (err) {
        return {status:400,response:err}
    }
}

const turnOnrequest  = async(channel,login,token)=>{
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    return fetch(`http://d.zeitech.co.il/dz.cgi?channel=${channel}&state=1&login=${login}&token=${token}`, requestOptions)
    .then(response => response.json())
    .then(result => resu = result)
    .catch(error => console.log('error', error));
}

const switchToOnApi = async (channel, login, token) => {
    //console.log(req)
    try {
        let resu;


        const r = await turnOnrequest(channel,login,token)
            return {status:200,response:resu}
        }
    catch (err) {
        return {status:400,response:err}
    }
}


module.exports = {
    switchToOffApi,switchToOnApi,turnOffrequest,turnOnrequest
}