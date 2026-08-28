// OAuth handler for Décap CMS — GitHub OAuth flow
export default function handler(req, res) {
  const clientId = process.env.GITHUB_CLIENT_ID;
  if (!clientId) {
    return res.status(500).send('GITHUB_CLIENT_ID env variable is not set.');
  }
  const scope = 'repo,user';
  const redirectUri = `${req.headers['x-forwarded-proto'] || 'https'}://${req.headers.host}/api/auth/callback`;
  const githubUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=${scope}&redirect_uri=${encodeURIComponent(redirectUri)}`;
  res.redirect(githubUrl);
}
