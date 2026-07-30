'use client';

import { useState } from 'react';
import { cn } from '@shared/utils/cn';

/**
 * Imagen con respaldo si la URL falla: un lienzo de papel con el monograma,
 * para que un hueco nunca rompa la composición.
 */
export function ImageWithFallback({
  src,
  alt,
  className,
  priority = false
}: {
  src: string;
  alt: string;
  className?: string;
  /** Desactiva la carga diferida en imágenes visibles al entrar. */
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div
        className={cn(
          'flex items-center justify-center bg-bone-200 halo-warm text-clay',
          className
        )}
        aria-label={alt}
        role="img"
      >
        <span className="font-display text-xs italic tracking-[0.3em]">edp</span>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
