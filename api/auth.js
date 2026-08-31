// OAuth handler for Décap CMS — GitHub OAuth flow
export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).send('Method not allowed');
  }

  const clientId = process.env.GITHUB_CLIENT_ID;
  if (!clientId) {
    return res.status(500).send('Configuration error.');
  }

  const proto = req.headers['x-forwarded-proto'] || 'https';
  const host = req.headers.host;
  if (!host || !host.endsWith('afbtaxis.com')) {
    return res.status(400).send('Invalid host.');
  }

  const scope = 'repo,user';
  const redirectUri = `${proto}://${host}/api/auth/callback`;
  const githubUrl = `https://github.com/login/oauth/authorize?client_id=${encodeURIComponent(clientId)}&scope=${encodeURIComponent(scope)}&redirect_uri=${encodeURIComponent(redirectUri)}`;
  res.setHeader('Cache-Control', 'no-store');
  res.redirect(302, githubUrl);
}
