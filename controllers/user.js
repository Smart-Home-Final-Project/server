const { User } = require('../models/user');

//post
const login = async (req, res) => {
    const user = await User.findOne({ userName: req.body.userName, password: req.body.password });
    if (!user)
        return res.status(400).send({ message: "Invalid login information" });
    else
        return res.status(200).send(user);
}

//post
const addUser = async (req, res) => {
    let user = new User(req.body);
    console.log(user)
    try {
        await user.save();
        return res.status(200).send(user);
    }
    catch (err) {
        return res.status(400).send(err);
    }
}

//get
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        return res.status(200).send(users);
    }
    catch (e) {
        return res.status(400).send(e);
    }
}

//get
const getUserById = async (req, res) => {
    let userId = req.params.id;
    try {
        let user = await User.findById(userId);
        return res.send(user);
    }
    catch (err) {
        return res.status(400).send(err);
    }
}

//delete
const deleteUserById = async (req, res) => {
    let userId = req.params.id;
    try {
        let user = await User.findByIdAndDelete(userId);
        return res.send(user);
    }
    catch(err){
        return res.status(400).send(err);
    }
}

module.exports = { login, addUser, getAllUsers, getUserById,deleteUserById }