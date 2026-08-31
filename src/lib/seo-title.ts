const TITLE_SUFFIX = ' | AFB Taxis';
const DEFAULT_MAX = 60;

/** Keep `<title>` within ~60 chars for SERP display (`docs/01`). H1 stays full length. */
export function formatDocumentTitle(headline: string, maxTotal = DEFAULT_MAX): string {
  return clampTitle(`${headline}${TITLE_SUFFIX}`, maxTotal);
}

/** Truncate a title that already includes branding suffix. */
export function clampTitle(title: string, maxTotal = DEFAULT_MAX): string {
  if (title.length <= maxTotal) return title;

  const ellipsis = '…';
  const trimmed = title.slice(0, maxTotal - ellipsis.length).replace(/\s+\S*$/, '').trim();
  const head = trimmed || title.slice(0, maxTotal - ellipsis.length);
  return `${head}${ellipsis}`;
}
