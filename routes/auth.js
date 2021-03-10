const router = require('express').Router();
const { UsersService } = require('../services/users');
const User = require('../models/userModel');

router.post('/sign-up', async (req, res) => {
  try {
    const { user } = req.body;
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
        name: user.firstName,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/check-user', async (req, res) => {
  const { email } = req.body;
  const existingUser = await User.findOne({ email: email });

  if (existingUser) {
    return res.status(200).json({ status: 'EXISTS' });
  } else {
    return res.status(200).json({ status: 'DOES NOT EXISTS' });
  }
});

module.exports = router;
