const userRouter = require('express').Router();
const userController = require('../controllers/user');
const { authenticateToken } = require('./auth');


userRouter.get('/', userController.getAllUsers);
userRouter.get('/token',authenticateToken, userController.getUserByToken);
userRouter.get('/:id', userController.getUserById);
userRouter.post('/login', userController.login);
userRouter.post('/add', userController.addUser);
userRouter.delete('/:id', userController.deleteUserById);

module.exports = userRouter
