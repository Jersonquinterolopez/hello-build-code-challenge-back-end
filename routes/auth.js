const router = require('express').Router();
const jwt = require('jsonwebtoken');
const { UsersService } = require('../services/users');

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
    res.json('it works');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
