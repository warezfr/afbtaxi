import { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';
import { useReducedMotion } from 'motion/react';

export function Logo({
  variant = 'horizontal',
  className = '',
}: {
  variant?: 'horizontal' | 'mark';
  className?: string;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !svgRef.current) return;
    
    // Animate the damier blocks (staggered fade in / scale)
    const blocks = svgRef.current.querySelectorAll('.damier rect');
    if (blocks.length > 0) {
      animate(blocks, {
        opacity: [0, 1],
        scale: [0.6, 1],
        delay: stagger(40),
        duration: 700,
        ease: 'outExpo',
      });
    }
  }, [prefersReducedMotion]);

  return (
    <span className={`inline-flex items-center gap-3 ${className}`} aria-label="AFB Taxis" role="img">
      <svg
        ref={svgRef}
        className="h-9 w-9 shrink-0"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d="M32 6 L60 58 H47 L32 28 L17 58 H4 Z" fill="currentColor"/>
        <g className="damier">
          <rect x="24" y="40" width="4" height="4" fill="#D9B257"/><rect x="28" y="40" width="4" height="4" fill="currentColor"/><rect x="32" y="40" width="4" height="4" fill="#D9B257"/><rect x="36" y="40" width="4" height="4" fill="currentColor"/>
          <rect x="22" y="44" width="4" height="4" fill="currentColor"/><rect x="26" y="44" width="4" height="4" fill="#D9B257"/><rect x="30" y="44" width="4" height="4" fill="currentColor"/><rect x="34" y="44" width="4" height="4" fill="#D9B257"/><rect x="38" y="44" width="4" height="4" fill="currentColor"/>
        </g>
      </svg>
      {variant === 'horizontal' && (
        <span className="flex flex-col leading-none">
          <span className="font-display text-[1.35rem] font-extrabold tracking-tight">AFB <span className="font-medium">Taxis</span></span>
          <span className="mt-1 text-[0.6rem] font-semibold uppercase tracking-[0.28em] opacity-70">Fontainebleau</span>
        </span>
      )}
    </span>
  );
}
