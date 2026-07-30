import type { ReactNode } from 'react';
import { cn } from '@shared/utils/cn';

/** Contenedor centrado con ancho máximo y padding lateral responsive. */
export function Container({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('mx-auto w-full max-w-content px-5 sm:px-8 lg:px-12', className)}>
      {children}
    </div>
  );
}
