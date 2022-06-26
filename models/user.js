const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    institutionId: Number,
    userName: String,
    phone: { type: String, match: /[0-9]/, lengthValidator: 10 },
    address: String,
    email: { type: String, match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ]},
    password: { type: String, minlength: 8 },
    dateJoin: { type: Date, default: Date.now }
})

const User = mongoose.model("Users", UserSchema);
module.exports = { User, UserSchema };