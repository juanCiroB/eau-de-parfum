import type { ReactNode } from 'react';
import { cn } from '@shared/utils/cn';

/** Contenedor centrado con ancho máximo y márgenes laterales generosos. */
export function Container({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('mx-auto w-full max-w-content px-4 sm:px-8 lg:px-14', className)}>
      {children}
    </div>
  );
}
