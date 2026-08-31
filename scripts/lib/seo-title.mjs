const TITLE_SUFFIX = ' | AFB Taxis';
const DEFAULT_MAX = 60;

export function formatDocumentTitle(headline, maxTotal = DEFAULT_MAX) {
  return clampTitle(`${headline}${TITLE_SUFFIX}`, maxTotal);
}

export function clampTitle(title, maxTotal = DEFAULT_MAX) {
  if (title.length <= maxTotal) return title;

  const ellipsis = '…';
  const trimmed = title.slice(0, maxTotal - ellipsis.length).replace(/\s+\S*$/, '').trim();
  const head = trimmed || title.slice(0, maxTotal - ellipsis.length);
  return `${head}${ellipsis}`;
}
