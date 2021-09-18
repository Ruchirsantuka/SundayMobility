const jwt = require('jsonwebtoken')
const UsersModel = require('../model/usersSchema');
const config = require('../config.json');

const login = async (req, res) => {
  try {
    const user = await UsersModel.findOne({username: req.body.username});
    if (!user) {
      return res.status(400).send({message: "The username does not exist"});
    }
    if (!user.validatePassword(req.body.password)) {
      return res.status(400).send({message: "The password is invalid"});
    }
    const accessToken = jwt.sign({username: user.username,  role: user.role}, config.secret);
    res.status(200).json({msg: "Login successful", accessToken})
  } catch (error) {
    res.status(500).send(error);
  }
}

module.exports = login