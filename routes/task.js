const { Router } = require('express');
const TaskController = require('../controller/task.controller.js');
const { checkUser } = require('../middlewares/user.mw');
const paginate = require('../middlewares/paginate.mw');

const taskRouter = Router();

taskRouter.post('/:id', checkUser, TaskController.createTask);
taskRouter.get('/:id', checkUser, paginate, TaskController.getUserTasks);

taskRouter.patch('/:taskId', TaskController.updateTask);
taskRouter.delete('/:taskId', TaskController.deleteTask);

module.exports = taskRouter;
