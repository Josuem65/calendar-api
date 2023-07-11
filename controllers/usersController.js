const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

function createToken(_id) {
  return jwt.sign({ _id }, process.env.SECRET_KEY, { expiresIn: "3d" });
}

async function loginUser(req, res) {
  const { username, password } = req.body;

  try {
    const user = await User.login(username, password);
    const token = createToken(user._id);

    res.status(200).json({ username, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function signupUser(req, res) {
  const { username, password } = req.body;
  try {
    const user = await User.signup(username, password);

    const token = createToken(user._id);

    res.status(201).json({ username, token });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ error: err.message });
  }
}

async function findUserByName(req, res) {
  const { username } = req.params;
  try {
    const user = await User.find(username);
    
    res.status(200).json({ user });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ error: err.message });
  }
}

module.exports = {
  loginUser,
  signupUser,
  findUserByName,
};
