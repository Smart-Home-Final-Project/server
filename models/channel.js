const mongoose = require("mongoose");
const channelSchema = new mongoose.Schema({
    plcId: { type: mongoose.Types.ObjectId, ref: "Plcs" },
    name: String,
    category:Number,
    status: Boolean,
    channelNum:Number

})


const Channel = mongoose.model("Channels", channelSchema);
module.exports = { Channel, channelSchema };