const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  // email: {
  //   type: String,
  //   unique: true,
  // },
  password: {
    type: String,
    required: true,
  },
});

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}

userSchema.statics.find = async function (username) {
  const user = await this.findOne({ username })
  return user;
}

// static login method
userSchema.statics.login = async function (username, password) {
    // validation
    if (!username || !password) {
      throw Error("All fields must be filled.");
    }

    // get user
    const user = await this.findOne({ username });
    if (!user) {
      throw Error("Incorrect username");
    }

    // check password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        throw Error("Incorrect password");
    }

    return user;
}

// static signup method
userSchema.statics.signup = async function (username, password) {
  // validation
  if (!username || !password) {
    throw Error("All fields must be filled.");
  }
  // if (!validator.isEmail(email)) {
  //   throw Error("Please provide a valid email address.");
  // }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password is not strong enough.");
  }

  const exists = await this.findOne({ username });
  if (exists) {
    throw Error("Username already in use.");
  }

  // generate hash
  const hash = await hashPassword(password);

  // create new user
  const user = await this.create({
    username,
    password: hash,
  });
  return user;
};

module.exports = model("User", userSchema);
