'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { cn } from '@shared/utils/cn';

/**
 * Entrada por scroll. Nada aparece de golpe: los bloques suben con desenfoque
 * y se asientan con la curva háptica.
 *
 * Usa IntersectionObserver (nunca listeners de scroll, que provocan reflow
 * continuo) y anima solo `transform`, `opacity` y `filter`.
 */
export function Reveal({
  children,
  delay = 0,
  as: Tag = 'div',
  className
}: {
  children: ReactNode;
  /** Retardo en ms para escalonar elementos hermanos. */
  delay?: number;
  as?: 'div' | 'section' | 'li' | 'article';
  className?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Sin soporte o con movimiento reducido: mostrar sin animar.
    if (
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShown(true);
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.08 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        'transition-[opacity,transform,filter] duration-[900ms] ease-haptic motion-reduce:transition-none',
        shown ? 'translate-y-0 opacity-100 blur-0' : 'translate-y-12 opacity-0 blur-[6px]',
        className
      )}
    >
      {children}
    </Tag>
  );
}
