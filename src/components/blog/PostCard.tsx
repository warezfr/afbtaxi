import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import type { BlogPost } from '@/hooks/useBlogPosts';
import { cardVariants, formatDate } from './utils';

export const PostCard = forwardRef<HTMLElement, { post: BlogPost; eager?: boolean }>(function PostCard({ post, eager = false }, ref) {
  const reduce = useReducedMotion();
  return (
    <motion.article
      ref={ref}
      layout={!reduce}
      variants={reduce ? undefined : cardVariants}
      exit={reduce ? undefined : 'exit'}
      whileHover={reduce ? undefined : { y: -2 }}
      className="group"
    >
      <Link
        to={`/blog/${post.slug}`}
        className="block rounded-[20px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-950"
      >
        <div className="overflow-hidden rounded-[20px] bg-zinc-200 dark:bg-zinc-900">
          <img
            src={post.imageUrl}
            alt={post.imageAlt || post.title}
            width={800}
            height={500}
            loading={eager ? 'eager' : 'lazy'}
            decoding="async"
            className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        </div>
        <p className="mt-4 text-sm font-medium text-gold-700 dark:text-gold-300">{post.category}</p>
        <h3 className="mt-1 line-clamp-2 font-display text-xl leading-snug tracking-tight text-zinc-900 dark:text-zinc-50">
          {post.title}
        </h3>
        <p className="mt-2 text-sm tabular-nums text-zinc-600 dark:text-zinc-400">
          {formatDate(post.date)} · {post.readingMinutes} min de lecture
        </p>
      </Link>
    </motion.article>
  );
});
