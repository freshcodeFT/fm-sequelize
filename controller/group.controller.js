const _ = require('lodash');
const createError = require('http-errors');
const { Group, User } = require('../models');

module.exports.createUserGroup = async (req, res, next) => {
  try {
    const { body } = req;

    const values = _.pick(body, ['name', 'imagePath', 'description']);

    const group = await Group.create({ ...values, userId: body.userId });

    const user = await User.findByPk(body.userId, {
      attributes: {
        exclude: ['password'],
      },
    });
    await group.addUser(user);

    res.send({ data: group });
  } catch (err) {
    next(err);
  }
};

module.exports.getUserGroups = async (req, res, next) => {
  try {
    const {
      params: { userId },
    } = req;

    const userWithGroups = await User.findByPk(userId, {
      include: [
        {
          model: Group,
          // as: 'group',
          through: {
            attributes: [],
          },
        },
      ],
    });

    if (!userWithGroups) {
      return next(createError(404, 'User not found'));
    }

    res.send(userWithGroups);
  } catch (err) {
    next(err);
  }
};

module.exports.addUserToGroup = async (req, res, next) => {
  try {
    const {
      params: { groupId },
      body: { userId },
    } = req;

    const user = await User.findByPk(userId);
    const group = await Group.findByPk(groupId);

    await group.addUser(user);

    const groupWithUsers = await Group.findAll({
      where: { id: groupId },
      include: [
        {
          model: User,
          attributes: {
            exclude: ['password'],
          },
          through: {
            attributes: [],
          },
        },
      ],
    });

    res.send(groupWithUsers);
  } catch (err) {
    next(err);
  }
};

/*
{
    "fieldname": "image",
    "originalname": "grapefruit-slice-332-332.jpg",
    "encoding": "7bit",
    "mimetype": "image/jpeg",
    "destination": "public/images",
    "filename": "70f5885f1d667ceb1466da4de05e2366",
    "path": "public/images/70f5885f1d667ceb1466da4de05e2366",
    "size": 18122
}
*/
module.exports.createImage = async (req, res, next) => {
  try {
    const {
      file: { filename },
      params: { groupId },
    } = req;

    const [rowsCount, [updatedGroup]] = await Group.update(
      { imagePath: filename },
      {
        where: {
          id: groupId,
        },
        returning: true,
      }
    );
    if (rowsCount != 1) {
      return next(createError(404, 'Group not found'));
    }

    res.send(updatedGroup);
    //res.send(req.file);
  } catch (err) {
    next(err);
  }
};
