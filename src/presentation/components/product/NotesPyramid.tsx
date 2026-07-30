import type { OlfactoryNotes } from '@domain/entities/Product';
import { cn } from '@shared/utils/cn';

/**
 * ELEMENTO FIRMA de la marca: la pirámide olfativa.
 * Nace del mundo real de la perfumería (salida / corazón / fondo) en vez de un
 * acordeón genérico. Comunica conocimiento del producto y refuerza el lujo.
 */
const LEVELS: Array<{ key: keyof OlfactoryNotes; label: string; width: string }> = [
  { key: 'top', label: 'Salida', width: 'w-1/3' },
  { key: 'heart', label: 'Corazón', width: 'w-2/3' },
  { key: 'base', label: 'Fondo', width: 'w-full' }
];

export function NotesPyramid({ notes }: { notes: OlfactoryNotes }) {
  return (
    <div className="space-y-px">
      {LEVELS.map((level, i) => (
        <div
          key={level.key}
          className={cn(
            'mx-auto flex flex-col items-center gap-2 border border-gold/30 bg-noir-800 px-6 py-5 text-center',
            level.width
          )}
        >
          <span className="text-[10px] uppercase tracking-luxe text-gold">
            {String(i + 1).padStart(2, '0')} · {level.label}
          </span>
          <p className="font-display text-base font-light text-ivory">
            {notes[level.key].join(' · ')}
          </p>
        </div>
      ))}
    </div>
  );
}
