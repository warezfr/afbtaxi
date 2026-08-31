// OAuth callback for Décap CMS
const SITE_ORIGIN = 'https://www.afbtaxis.com';

export default async function handler(req, res) {
  const { code } = req.query;
  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;

  if (!code) return res.status(400).send('Missing code parameter.');
  if (!clientId || !clientSecret) return res.status(500).send('GitHub OAuth env variables not set.');

  try {
    const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code }),
    });
    const data = await tokenRes.json();

    if (data.error) {
      return res.status(400).send('GitHub OAuth error.');
    }

    const authPayload = JSON.stringify({
      token: data.access_token,
      provider: 'github',
    });

    const successHtml = `<!DOCTYPE html>
<html lang="fr">
<head><title>Authentification réussie...</title></head>
<body>
<script>
  (function() {
    var payload = ${JSON.stringify(authPayload)};
    var targetOrigin = ${JSON.stringify(SITE_ORIGIN)};
    function receiveMessage(e) {
      if (e.origin !== targetOrigin) return;
      window.opener.postMessage('authorization:github:success:' + payload, e.origin);
    }
    window.addEventListener('message', receiveMessage, false);
    window.opener.postMessage('authorizing:github', targetOrigin);
  })();
</script>
<p>Connexion réussie, fermeture automatique...</p>
</body>
</html>`;

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('X-Frame-Options', 'DENY');
    res.send(successHtml);
  } catch {
    res.status(500).send('Authentication failed.');
  }
}
