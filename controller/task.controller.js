const createError = require('http-errors');
const { Task } = require('../models');

module.exports.createTask = async (req, res, next) => {
  try {
    const { body, userInstance } = req;
    //const createdTask = await Task.create({...body, userId: userInstance.userId});
    const createdTask = await userInstance.createTask(body);
    res.status(201).send({
      data: createdTask,
    });
  } catch (err) {
    res.status(400).send({
      err,
    });
    //next(err);
  }
};

module.exports.getUserTasks = async (req, res, next) => {
  try {
    const { userInstance, pagination = {} } = req;

    const tasks = await userInstance.getTasks({ ...pagination });
    console.log(userInstance);
    res.send(tasks);
  } catch (err) {
    next(err);
  }
};

module.exports.updateTask = async (req, res, next) => {
  try {
    const {
      params: { taskId },
      body,
    } = req;

    const [rowsCount, updatedTask] = await Task.update(body, {
      where: { id: taskId },
      returning: true,
    });

    if (rowsCount !== 1) {
      return next(createError(400, "Task can't be updated"));
    }

    res.send({
      data: updatedTask,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.deleteTask = async (req, res, next) => {
  try {
    const {
      params: { taskId },
    } = req;

    const rowsCount = await Task.destroy({ where: { id: taskId } });

    if (rowsCount !== 1) {
      return next(createError(404, 'Task not found'));
    }

    res.send({
      data: rowsCount,
    });
  } catch (err) {
    next(err);
  }
};
