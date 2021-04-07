const { config } = require('../config');
const router = require('express').Router();
const axios = require('axios');
const authUrl = 'https://github.com/login/oauth/authorize';
const access_token_url = 'https://github.com/login/oauth/access_token';
const client_id = config.github_client_id;
const client_secret = config.github_client_secret;
const scope = 'repo';
const Repo = require('../models/repoModel');
const auth = require('../middleware/auth');

router.get('/code-exchange', async ({ query: { code } }, res) => {
  console.log(code);

  const body = {
    client_id,
    client_secret,
    code,
  };

  const options = { headers: { accept: 'application/json' } };

  // POST
  axios
    .post(access_token_url, body, options)
    .then((response) => response.data.access_token)
    .then((token) => {
      res.status(200).json({ token: token });
    })
    .catch((err) => res.status(500).json({ err: err.message }));
});

router.get('/auth', async (req, res) => {
  res.redirect(
    `${authUrl}?client_id=${client_id}&scope=${scope}&state=${STATE})`
  );
});

router.post('/add-to-favorite', auth, async (req, res) => {
  try {
    const { repo } = req.body;
    const { name, url, id } = repo;

    const newFavoriteRepo = new Repo({
      id: id,
      userId: req.user,
      name,
      url,
    });

    const savedFavoriteRepo = await newFavoriteRepo.save();
    res.status(200).json(savedFavoriteRepo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/favorite-repos', auth, async (req, res) => {
  const repos = await Repo.find({ userId: req.user });
  let reformattedRepos = repos.map(({ id, name, url }) => ({
    id,
    name,
    url,
  }));

  res.status(200).send(reformattedRepos);
});

router.post('/find-repo', auth, async (req, res) => {
  const { name } = req.body;
  const repo = await Repo.findOne({ name: name });

  if (repo) {
    return res.status(200).send(true);
  } else {
    return res.status(200).send(false);
  }
});

router.delete('/delete/:id', auth, async (req, res) => {
  try {
    await Repo.deleteOne({ id: req.params.id });
    res.send('Deleted successfully');
  } catch (error) {
    res.status(400).json({ error: 'No favorite Repo founded, action denied' });
  }
});

module.exports = router;
