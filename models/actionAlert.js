
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId;

const actionAlertSchema = new mongoose.Schema({
    name: String,
    userId: { type: mongoose.Types.ObjectId, ref: 'Users' },
    idChannel: { type: mongoose.Types.ObjectId, ref: 'Channels' },
    // idChannelsGroup: { type: mongoose.Types.ObjectId, ref: 'ChannelsGroup' },
    timeStart: { type: Date, default: Date.now() },
    timeEnd: { type: Date, default: Date.now() },
    status: Boolean,
    frequency: { type: String, enum: ['once', 'daily', 'by days'] },
    days: { type: [Boolean], default: [false, false, false, false, false, false, false] }
})

const ActionAlert = mongoose.model('ActionAlerts', actionAlertSchema)

module.exports = {
    ActionAlert, actionAlertSchema
}
