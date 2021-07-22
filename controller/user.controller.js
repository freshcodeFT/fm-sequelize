const { User } = require('../models');

module.exports.createUser = async (req, res, next) => {
  try {
    const { body } = req;
    const createdUser = await User.create(body);
    console.log(createdUser);
    res.status(201).send({
      data: createdUser,
    });
  } catch (error) {
    res.status(400).send({
      error,
    });
    //next(err);
  }
};

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: {
        exclude: ['password'],
      },
    });
    res.status(200).send({
      data: users,
    });
  } catch (error) {}
};
