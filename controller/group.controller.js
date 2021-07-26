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
