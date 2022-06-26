const userRouter = require('express').Router();
const userController = require('../controllers/user')

userRouter.get('/', userController.getAllUsers);
userRouter.get('/:id', userController.getUserById);
userRouter.post('/login', userController.login);
userRouter.post('/add', userController.addUser);
userRouter.delete('/:id', userController.deleteUserById);

module.exports = userRouter
