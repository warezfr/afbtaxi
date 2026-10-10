import { useEffect, useRef, type ElementType } from 'react';
import { animate, stagger } from 'animejs';
import { useMotionOk } from '../motion';

/**
 * Word-by-word reveal driven by anime.js. Text is rendered visible by default;
 * the reveal only runs once mounted (and never under reduced motion).
 * `trigger` = 'mount' (hero) or 'view' (IntersectionObserver, once).
 */
export function SplitText({
  text,
  as: Tag = 'span',
  className = '',
  delay = 0,
  trigger = 'view',
}: {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  trigger?: 'mount' | 'view';
}) {
  const ref = useRef<HTMLElement>(null);
  const motionOk = useMotionOk();

  useEffect(() => {
    const root = ref.current;
    if (!motionOk || !root) return;
    const words = Array.from(root.querySelectorAll<HTMLElement>('[data-w]'));
    if (!words.length) return;
    let anim: ReturnType<typeof animate> | undefined;
    let observer: IntersectionObserver | undefined;

    const run = () => {
      anim = animate(words, {
        translateY: ['110%', '0%'],
        rotate: [3, 0],
        opacity: [0, 1],
        delay: stagger(45, { start: delay }),
        duration: 1000,
        ease: 'outExpo',
      });
    };

    words.forEach((w) => { w.style.opacity = '0'; w.style.transform = 'translateY(110%)'; });
    if (trigger === 'mount') {
      run();
    } else {
      observer = new IntersectionObserver((entries) => {
        if (entries.some((e) => e.isIntersecting)) { run(); observer?.disconnect(); }
      }, { threshold: 0.3 });
      observer.observe(root);
    }
    return () => {
      observer?.disconnect();
      anim?.cancel();
      words.forEach((w) => { w.style.opacity = ''; w.style.transform = ''; });
    };
  }, [motionOk, delay, trigger, text]);

  const words = text.split(' ');
  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom pb-[0.08em] -mb-[0.08em]" aria-hidden="true">
          <span data-w className="inline-block">{w}{i < words.length - 1 ? ' ' : ''}</span>
        </span>
      ))}
    </Tag>
  );
}
