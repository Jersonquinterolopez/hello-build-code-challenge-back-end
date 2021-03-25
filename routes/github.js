const router = require('express').Router();
const axios = require('axios');
const STATE = 2113899652;
const authUrl = 'https://github.com/login/oauth/authorize';
const access_token_url = 'https://github.com/login/oauth/access_token';
const client_redirect_url = 'http://localhost:3000/dashboard/github_section';
const client_id = process.env.GITHUB_API_CLIENT_ID;
const client_secret = process.env.GITHUB_API_CLIENT_SECRET;
const scope = 'repo';

router.get('/oauth-callback', async ({ query: { code } }, res) => {
  console.log(code);
  const STATE = 2113899652;

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
      // eslint-disable-next-line no-console
      console.log('My token:', token);

      res.redirect(`${client_redirect_url}?token=${token}`);
    })
    .catch((err) => res.status(500).json({ err: err.message }));
});

router.get('/auth', async (req, res) => {
  res.redirect(
    `${authUrl}?client_id=${client_id}&scope=${scope}&state=${STATE})`
  );
});

module.exports = router;
