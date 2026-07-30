import type { OlfactoryNotes } from '@domain/entities/Product';

/**
 * ELEMENTO FIRMA de la marca: la pirámide olfativa.
 * Nace del mundo real de la perfumería (salida / corazón / fondo) en vez de un
 * acordeón genérico.
 *
 * Ahora se lee como una escala: una barra de acento que crece con la
 * profundidad de la nota, y la lista alineada a la izquierda para poder leerla.
 */
const LEVELS: Array<{ key: keyof OlfactoryNotes; label: string; width: string }> = [
  { key: 'top', label: 'Salida', width: 'w-1/3' },
  { key: 'heart', label: 'Corazón', width: 'w-2/3' },
  { key: 'base', label: 'Fondo', width: 'w-full' }
];

export function NotesPyramid({ notes }: { notes: OlfactoryNotes }) {
  return (
    <ol className="space-y-7">
      {LEVELS.map((level, i) => (
        <li key={level.key}>
          <div className="flex items-baseline justify-between gap-4">
            <span className="text-[10px] uppercase tracking-luxe text-clay-dark">
              <span className="font-mono text-terra">{String(i + 1).padStart(2, '0')}</span>
              {'  '}
              {level.label}
            </span>
            <span className="font-mono text-[10px] text-clay">
              {notes[level.key].length} notas
            </span>
          </div>

          {/* La barra crece con la profundidad de la nota. */}
          <div className="mt-2.5 h-px w-full bg-ink/10">
            <div className={`h-px bg-terra ${level.width}`} />
          </div>

          <p className="mt-3 font-display text-lg font-light leading-snug text-ink">
            {notes[level.key].join(' · ')}
          </p>
        </li>
      ))}
    </ol>
  );
}
