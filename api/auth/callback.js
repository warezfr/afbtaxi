// OAuth callback for Décap CMS
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
      return res.status(400).send(`GitHub OAuth error: ${data.error_description}`);
    }

    // Send token back to Décap CMS via postMessage
    const html = `<!DOCTYPE html>
<html>
<head><title>Authentification réussie...</title></head>
<body>
<script>
  (function() {
    function receiveMessage(e) {
      console.log("receiveMessage %o", e);
      window.opener.postMessage(
        'authorization:github:success:${JSON.stringify(data).replace(/\\/g, '\\\\').replace(/'/g, "\\'")}',
        e.origin
      );
    }
    window.addEventListener("message", receiveMessage, false);
    window.opener.postMessage("authorizing:github", "*");
  })()
</script>
<p>Connexion réussie, fermeture automatique...</p>
</body>
</html>`;

    // Replace the token properly
    const successHtml = `<!DOCTYPE html>
<html>
<head><title>Authentification réussie...</title></head>
<body>
<script>
  (function() {
    function receiveMessage(e) {
      window.opener.postMessage(
        'authorization:github:success:{"token":"${data.access_token}","provider":"github"}',
        e.origin
      );
    }
    window.addEventListener("message", receiveMessage, false);
    window.opener.postMessage("authorizing:github", "*");
  })()
</script>
<p>Connexion réussie, fermeture automatique...</p>
</body>
</html>`;

    res.setHeader('Content-Type', 'text/html');
    res.send(successHtml);
  } catch (err) {
    res.status(500).send(`Error: ${err.message}`);
  }
}
