const router = require('express').Router();
const axios = require('axios');
const authUrl = 'https://github.com/login/oauth/authorize';
const access_token_url = 'https://github.com/login/oauth/access_token';
const client_id = process.env.GITHUB_API_CLIENT_ID;
const client_secret = process.env.GITHUB_API_CLIENT_SECRET;
const scope = 'repo';

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

module.exports = router;
