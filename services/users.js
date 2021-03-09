const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

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
  },
};

module.exports = { UsersService };
