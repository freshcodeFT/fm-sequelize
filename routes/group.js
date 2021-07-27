const { Router } = require('express');
const multer = require('multer');
const path = require('path');
const { STATIC_PATH } = require('../config/config');
const GroupController = require('../controller/group.controller.js');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(STATIC_PATH, 'images'));
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}.${file.originalname}`);
  },
});
const upload = multer({ storage });

const groupRouter = Router();

groupRouter.post('/', GroupController.createUserGroup);
groupRouter.get('/:userId', GroupController.getUserGroups);
groupRouter.put('/:groupId', GroupController.addUserToGroup);
groupRouter.post(
  '/:groupId/image',
  upload.single('image'),
  GroupController.createImage
);

module.exports = groupRouter;
