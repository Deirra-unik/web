import { useState, useEffect } from "react";
import type { FC } from "react";
import type { Comment } from "../types";

const VARIANT_NUMBER: number = 7;

const SkeletonCard: FC = () => (
  <div className="bg-white dark:bg-neutral-800 rounded-2xl p-7 border border-stone-100 dark:border-neutral-700 flex flex-col gap-3">
    {[55, 35, 100, 100, 70].map((w, i) => (
      <div
        key={i}
        className="h-3 rounded-lg bg-stone-200 dark:bg-neutral-700 animate-pulse"
        style={{ width: `${w}%` }}
      />
    ))}
  </div>
);

const ReviewCard: FC<{ comment: Comment; index: number }> = ({
  comment,
  index,
}) => (
  <article
    className="bg-white dark:bg-neutral-800 rounded-2xl p-7
      border border-stone-100 dark:border-neutral-700
      shadow-sm hover:shadow-lg hover:-translate-y-1.5
      transition-all duration-300
      flex flex-col gap-4
      opacity-0 animate-fade-up"
    style={{ animationDelay: `${index * 0.1}s`, animationFillMode: "forwards" }}
  >
    <div className="w-11 h-11 rounded-full bg-amber-600 dark:bg-amber-500 text-white font-display font-bold text-lg flex items-center justify-center shrink-0">
      {comment.name.charAt(0).toUpperCase()}
    </div>
    <div className="flex-1">
      <p className="font-semibold text-stone-800 dark:text-stone-100 text-sm leading-snug mb-1">
        {comment.name}
      </p>
      <p className="text-amber-600 dark:text-amber-400 text-xs mb-3">
        {comment.email}
      </p>
      <p className="text-stone-500 dark:text-stone-400 text-sm leading-relaxed">
        {comment.body}
      </p>
    </div>
    <div
      className="text-amber-500 text-sm tracking-widest"
      aria-label="5 зірок"
    >
      ★★★★★
    </div>
  </article>
);

const Reviews: FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchComments = async (): Promise<void> => {
      try {
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${VARIANT_NUMBER}/comments`
        );
        if (!res.ok) throw new Error(`HTTP помилка: ${res.status}`);
        const data: Comment[] = await res.json();
        setComments(data);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Невідома помилка");
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, []);

  return (
    <section
      id="reviews"
      className="py-28 bg-stone-50 dark:bg-neutral-900 transition-colors duration-300"
    >
      <div className="max-w-5xl mx-auto px-6">
        <span className="inline-block text-xs font-semibold tracking-[3px] uppercase text-amber-600 dark:text-amber-400 mb-3">
          Відгуки
        </span>
        <h2
          className="font-display font-bold tracking-tight mb-14"
          style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
        >
          Що говорять про мою роботу
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {loading && [1, 2, 3].map((i) => <SkeletonCard key={i} />)}

          {error && (
            <div className="col-span-full bg-white dark:bg-neutral-800 border border-stone-100 dark:border-neutral-700 rounded-2xl p-8 text-center text-stone-500 dark:text-stone-400">
              ⚠️ Помилка завантаження: {error}
            </div>
          )}

          {!loading &&
            !error &&
            comments.map((comment, index) => (
              <ReviewCard key={comment.id} comment={comment} index={index} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
