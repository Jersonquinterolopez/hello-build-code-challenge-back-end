const router = require('express').Router();
const { UsersService } = require('../services/userService');
const User = require('../models/userModel');
const { config } = require('../config');
const jwt = require('jsonwebtoken');

router.post('/sign-up', async (req, res) => {
  try {
    const { user } = req.body;
    const existingUser = await User.findOne({ email: user.email });
    if (existingUser)
      return res
        .status(400)
        .json({ msg: 'This email address is already in use' });
    const savedUser = await UsersService.auth.createUser({ user });
    res.status(201).json({
      data: savedUser,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // validate
    if (!email || !password)
      return res.status(400).json({ msg: 'Not all field have been entered' });

    const existingUser = await UsersService.auth.findUser({
      email,
      password,
    });

    if (!existingUser)
      return res.status(400).json({ msg: 'Invalid credentials' });

    const { token, user } = existingUser;
    res.json({
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/validate-token', async (req, res) => {
  try {
    const token = req.header('x-auth-token');
    if (!token) return res.json(false);

    const verified = jwt.verify(token, config.authJwtSecret);
    if (!verified) return res.json(false);

    const user = await User.findById(verified.id);
    if (!user) return res.json(false);

    return res.status(200).json(true);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/check-user', async (req, res) => {
  const { email } = req.body;
  const existingUser = await User.findOne({ email: email });

  if (existingUser) {
    return res.json(true);
  } else {
    return res.json(false);
  }
});

// isTokenValid route Pending!

module.exports = router;
