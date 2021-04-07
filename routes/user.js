const router = require('express').Router();
const User = require('../models/userModel');
const auth = require('../middleware/auth');

router.patch('/update/:id', auth, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });

    if (req.body.firstName) {
      user.firstName = req.body.firstName;
    }

    if (req.body.lastName) {
      user.lastName = req.body.lastName;
    }

    if (req.body.email !== user.email) {
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        return res.status(400).json({
          msg: 'This email is already in use, please try another one!',
        });
      } else {
        user.email = req.body.email;
      }
    }

    const updatedUser = await user.save();
    res.json({
      user: {
        id: updatedUser._id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
      },
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/', auth, async (req, res) => {
  const user = await User.findById(req.user);
  res.status(200).json({
    id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  });
});

module.exports = router;
