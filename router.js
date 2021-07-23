const { Router } = require('express');
const UserController = require('./controller/user.controller.js');
const TaskController = require('./controller/task.controller.js');
const UserMW = require('./middlewares/user.mw');
const router = Router();

router.post('/user', UserController.createUser);
router.get('/users', UserController.getAllUsers);
router.get('/user/:id', UserController.getUser);


router.post(
  '/user/:id/task/',
  UserMW.checkUser,
  TaskController.createTask
);

router.get(
  '/user/:id/task/',
  UserMW.checkUser,
  TaskController.getUserTasks
);
module.exports = router;
