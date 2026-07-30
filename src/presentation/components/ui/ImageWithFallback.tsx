'use client';

import { useState } from 'react';
import { cn } from '@shared/utils/cn';

/**
 * Imagen con degradado de respaldo si la URL falla. Mantiene la estética aun
 * sin conexión a las imágenes de demostración.
 */
export function ImageWithFallback({
  src,
  alt,
  className
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div
        className={cn(
          'flex items-center justify-center bg-gradient-to-br from-noir-700 via-noir-800 to-noir text-gold/40',
          className
        )}
        aria-label={alt}
        role="img"
      >
        <span className="font-display text-sm tracking-luxe">EDP</span>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
