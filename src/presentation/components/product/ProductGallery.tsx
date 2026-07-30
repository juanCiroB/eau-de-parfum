'use client';

import { useState } from 'react';
import { ImageWithFallback } from '@presentation/components/ui/ImageWithFallback';
import { cn } from '@shared/utils/cn';

export function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0);
  const main = images[active] ?? images[0] ?? '';

  return (
    <div className="flex flex-col gap-4">
      {/* Bisel doble: bandeja de papel + núcleo con la pieza. */}
      <div className="overflow-hidden rounded-shell bg-bone-200 p-2 ring-1 ring-inset ring-ink/[0.06]">
        <div className="flex aspect-[4/5] items-center justify-center overflow-hidden rounded-core bg-bone-100 halo-warm">
          <ImageWithFallback
            src={main}
            alt={alt}
            priority
            className="h-full w-full object-contain p-8 transition-opacity duration-500"
          />
        </div>
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {images.map((img, i) => (
            <button
              key={img + i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Ver imagen ${i + 1}`}
              aria-pressed={i === active}
              className={cn(
                'aspect-square overflow-hidden rounded-[0.875rem] bg-bone-200 ring-1 ring-inset transition-all duration-500 ease-haptic active:scale-95',
                i === active
                  ? 'ring-2 ring-terra'
                  : 'ring-ink/[0.08] hover:ring-ink/25'
              )}
            >
              <ImageWithFallback
                src={img}
                alt={`${alt} ${i + 1}`}
                className="h-full w-full object-contain p-2.5"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
