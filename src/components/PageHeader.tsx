import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import { CaretRight } from '@phosphor-icons/react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  image?: string;
  imageAlt?: string;
  breadcrumb?: { label: string; to: string }[];
  children?: ReactNode;
}

const EASE = [0.16, 1, 0.3, 1] as const;

export function PageHeader({ title, subtitle, image, imageAlt = '', breadcrumb, children }: PageHeaderProps) {
  const reduce = useReducedMotion();

  return (
    <header className="bg-zinc-950 text-white pt-28 pb-16 lg:pt-36 lg:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className={image ? 'grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]' : ''}>
          <div>
            {breadcrumb && breadcrumb.length > 0 && (
              <nav aria-label="Fil d'Ariane" className="mb-6">
                <ol className="flex flex-wrap items-center gap-1 text-sm text-zinc-400">
                  {breadcrumb.map((item, i) => (
                    <li key={item.to + i} className="flex items-center gap-1">
                      {i > 0 && <CaretRight size={12} weight="regular" aria-hidden="true" />}
                      {i < breadcrumb.length - 1 ? (
                        <Link
                          to={item.to}
                          className="rounded-full hover:text-gold-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
                        >
                          {item.label}
                        </Link>
                      ) : (
                        <span aria-current="page" className="text-zinc-200">{item.label}</span>
                      )}
                    </li>
                  ))}
                </ol>
              </nav>
            )}
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.02] tracking-tight text-balance">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-6 max-w-[65ch] text-lg leading-relaxed text-zinc-300">{subtitle}</p>
            )}
            {children && <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">{children}</div>}
          </div>
          {image && (
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="overflow-hidden rounded-[20px] border border-white/10"
            >
              <img
                src={image}
                alt={imageAlt}
                width={1200}
                height={900}
                {...({ fetchpriority: 'high' } as object)}
                className="aspect-[4/3] w-full object-cover"
              />
            </motion.div>
          )}
        </div>
      </div>
    </header>
  );
}
