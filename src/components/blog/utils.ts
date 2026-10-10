const EASE = [0.16, 1, 0.3, 1] as const;

export const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
  exit: { opacity: 0, scale: 0.97, transition: { duration: 0.25 } },
};

export const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export function formatDate(iso: string): string {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
}
