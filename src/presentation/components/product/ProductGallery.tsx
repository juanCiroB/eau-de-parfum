'use client';

import { useState } from 'react';
import { ImageWithFallback } from '@presentation/components/ui/ImageWithFallback';
import { cn } from '@shared/utils/cn';

export function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0);
  const main = images[active] ?? images[0] ?? '';

  return (
    <div className="flex flex-col gap-4">
      <div className="aspect-[4/5] overflow-hidden bg-noir-800 flex items-center justify-center">
        <ImageWithFallback src={main} alt={alt} className="h-full w-full object-contain p-6" />
      </div>
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {images.map((img, i) => (
            <button
              key={img + i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Ver imagen ${i + 1}`}
              className={cn(
                'aspect-square overflow-hidden border bg-noir-800 transition-colors',
                i === active ? 'border-gold' : 'border-ivory/10 hover:border-ivory/30'
              )}
            >
              <ImageWithFallback src={img} alt={`${alt} ${i + 1}`} className="h-full w-full object-contain p-2" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
