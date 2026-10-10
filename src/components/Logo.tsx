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
    const blocks = svgRef.current.querySelectorAll('.damier-block');
    if (blocks.length > 0) {
      animate(blocks, {
        opacity: [0, 1],
        scale: [0.5, 1],
        delay: stagger(100),
        duration: 900,
        easing: 'easeOutExpo',
      });
    }
  }, [prefersReducedMotion]);

  if (variant === 'mark') {
    return (
      <svg
        ref={svgRef}
        className={className}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="AFB Taxis"
        role="img"
      >
        <path
          d="M 32 4 L 10 52 L 23 52 L 27 42 L 37 42 L 41 52 L 54 52 Z M 32 16 L 35 26 L 29 26 Z"
          fill="currentColor"
        />
        <rect className="damier-block" x="26" y="32" width="4" height="4" fill="#D9B257" />
        <rect className="damier-block" x="30" y="32" width="4" height="4" fill="currentColor" />
        <rect className="damier-block" x="34" y="32" width="4" height="4" fill="#D9B257" />
        <rect className="damier-block" x="26" y="36" width="4" height="4" fill="currentColor" />
        <rect className="damier-block" x="30" y="36" width="4" height="4" fill="#D9B257" />
        <rect className="damier-block" x="34" y="36" width="4" height="4" fill="currentColor" />
        <text
          x="32"
          y="62"
          fontFamily="Outfit, sans-serif"
          fontWeight="700"
          fontSize="7"
          letterSpacing="0.1em"
          textAnchor="middle"
          fill="currentColor"
        >
          FONTAINEBLEAU
        </text>
      </svg>
    );
  }

  return (
    <svg
      ref={svgRef}
      className={className}
      viewBox="0 0 320 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="AFB Taxis"
      role="img"
    >
      <g transform="translate(0, 0)">
        <path
          d="M 32 4 L 10 52 L 23 52 L 27 42 L 37 42 L 41 52 L 54 52 Z M 32 16 L 35 26 L 29 26 Z"
          fill="currentColor"
        />
        <rect className="damier-block" x="26" y="32" width="4" height="4" fill="#D9B257" />
        <rect className="damier-block" x="30" y="32" width="4" height="4" fill="currentColor" />
        <rect className="damier-block" x="34" y="32" width="4" height="4" fill="#D9B257" />
        <rect className="damier-block" x="26" y="36" width="4" height="4" fill="currentColor" />
        <rect className="damier-block" x="30" y="36" width="4" height="4" fill="#D9B257" />
        <rect className="damier-block" x="34" y="36" width="4" height="4" fill="currentColor" />
      </g>
      <text
        x="76"
        y="44"
        fontFamily="Outfit, sans-serif"
        fontWeight="800"
        fontSize="32"
        fill="currentColor"
      >
        AFB Taxis
      </text>
      <text
        x="78"
        y="56"
        fontFamily="Outfit, sans-serif"
        fontWeight="600"
        fontSize="9"
        letterSpacing="0.2em"
        fill="currentColor"
      >
        FONTAINEBLEAU
      </text>
    </svg>
  );
}
