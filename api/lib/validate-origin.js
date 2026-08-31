const ALLOWED_ORIGINS = new Set([
  'https://www.afbtaxis.com',
  'https://afbtaxis.com',
]);

/** Reject cross-origin API abuse when Origin/Referer is present. */
export function assertAllowedOrigin(req, res) {
  const origin = req.headers.origin;
  if (origin && !ALLOWED_ORIGINS.has(origin)) {
    res.status(403).json({ error: 'Origine non autorisée.' });
    return false;
  }

  const referer = req.headers.referer;
  if (referer) {
    try {
      const host = new URL(referer).origin;
      if (!ALLOWED_ORIGINS.has(host)) {
        res.status(403).json({ error: 'Origine non autorisée.' });
        return false;
      }
    } catch {
      res.status(403).json({ error: 'Origine non autorisée.' });
      return false;
    }
  }

  return true;
}
