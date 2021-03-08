const router = require('express').Router();
const jwt = require('jsonwebtoken');

router.post('/sign-up', async (req, res) => {
  try {
    res.json('it works');
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
