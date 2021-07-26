const { Router } = require('express');
const UserController = require('../controller/user.controller.js');
const paginate = require('../middlewares/paginate.mw');

const userRouter = Router();

userRouter.post('/', UserController.createUser);
userRouter.get('/', paginate, UserController.getAllUsers);
userRouter.get('/:id', UserController.getUser);
userRouter.patch('/:id', UserController.updateUser);
userRouter.delete('/:id', UserController.deleteUser);

module.exports = userRouter;
