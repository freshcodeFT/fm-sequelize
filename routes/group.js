const { Router } = require('express');
const GroupController = require('../controller/group.controller.js');

const groupRouter = Router();

groupRouter.post('/', GroupController.createUserGroup);
groupRouter.get('/:userId', GroupController.getUserGroups);
groupRouter.put('/:groupId', GroupController.addUserToGroup);

module.exports = groupRouter;
