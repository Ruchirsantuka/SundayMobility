const UsersModel = require('../model/usersSchema');

const getUsers = async (req, res) => {
  if (req.user.role !== "ADMIN") {
    return res.status(403).send({message: "The user is unauthorized"});
  }
  try {
    const users = await UsersModel.find({}, {_id: 0, __v: 0, password: 0, hash: 0, salt: 0});
    if (users.length > 0) {
      res.status(200).json({
        status: "success",
        userCount: users.length,
        data: {users},
      });
    } else {
      res.status(400).json({status: "success", data: {message: "No users available in the repo"}});
    }
  } catch (err) {
    res.status(404).json({status: "fail", message: err});
  }
};

const firstTimeCreateUser = async (req, res) => {
    try {
        const newUser = await UsersModel.create(req.body);
        res.status(201).json({status: 'success', data: {newUser}});
    } catch (err) {
        res.status(500).json({status: 'fail', message: err});
    }
};

const createUser = async (req, res) => {
  if (req.user.role !== "ADMIN") {
    return res.status(403).send({message: "The user is unauthorized"});
  }
  try {
    const newUser = await UsersModel.create(req.body);
    res.status(201).json({status: 'success', data: {newUser}});
  } catch (err) {
    res.status(500).json({status: 'fail', message: err});
  }
};

const updateUser = async (req, res) => {
  try {
    const users = await UsersModel.findOneAndUpdate(
      { username: req.params.username },
      req.body,
      {
        new: true,
        runValidators: true,
        context: 'query',
        projection: { _id: 0, __v: 0, password: 0, hash: 0, salt: 0 }
      }
    );
    if (users != null) {
      res.status(200).json({ status: 'success', data: { users },
      });
    } else {
      res.status(400).json({
        status: 'success', data: { message: `No users available with username: ${req.params.username} `},
      });
    }
  } catch (err) {
    res.status(404).json({ status: 'fail', message: err });
  }
}

const deleteUser = async (req, res) => {
  if (req.user.role !== 'ADMIN') {
    return res.status(403).send({message: "The user is unauthorized"});
  }
  const delDet = await UsersModel.deleteOne({username: req.params.username});
  if (delDet.deletedCount === 0) {
    res.status(404).json({
      status: 'fail',
      message: 'No user available for this username',
    });
  } else {
    res.status(200).json({
      status: 'success',
      message: `User with username: ${req.params.username} deleted`,
    });
  }
}

const invalid = async (req, res) => {
  res.status(404).json({
    status: 'fail',
    message: 'Invalid path',
  });
};

module.exports = {
    firstTimeCreateUser,
    createUser,
    getUsers,
    updateUser,
    deleteUser,
    invalid
};