const mongoose = require('mongoose');

const plcSchema = new mongoose.Schema({
    plcName: String,
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "Users"
    },
    numOfChannels: Number,
    login: String,
    token: String,
    // dateInstall: Date.now()
})

const Plc = mongoose.model("Plcs", plcSchema);
module.exports = {
    plcSchema, Plc
}
