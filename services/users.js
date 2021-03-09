const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const { config } = require('../config/index');
const jwt = require('jsonwebtoken');

const UsersService = {
  auth: {
    async createUser({ user }) {
      const { firstName, lastName, email, password } = user;

      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(password, salt);
      const newUser = new User({
        firstName,
        lastName,
        email,
        password: passwordHash,
      });
      const savedUser = await newUser.save();
      return savedUser || [];
    },
    async findUser({ email, password }) {
      const user = await User.findOne({ email: email });
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) return null;
      const token = jwt.sign({ id: user._id }, config.authJwtSecret);
      return { user, token } || [];
    },
  },
};

module.exports = { UsersService };
