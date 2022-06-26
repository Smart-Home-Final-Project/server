const { ObjectId } = require("bson");
const mongoose=require("mongoose");
const channelSchema=require('./channel').channelSchema;

const ChannelgroupSchema=new mongoose.Schema({
    groupName:String,
    userId:{type:ObjectId,ref:"Users"},
    status:Boolean,
    dateDefination:{ type: Date, default: Date.now },
    listChannels:[channelSchema]
})

const Channelgroup=mongoose.model("Channelgroups",ChannelgroupSchema);
module.exports={Channelgroup,ChannelgroupSchema};