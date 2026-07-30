/**
 * Clases compartidas de formulario.
 *
 * Un único lugar donde vive el aspecto de campos y etiquetas, para que los
 * formularios de cuenta y los del panel no diverjan con el tiempo.
 */
export const formStyles = {
  label: 'mb-2 block text-[10px] uppercase tracking-wide2 text-clay-dark',

  input:
    'w-full rounded-full bg-bone-200/70 px-5 py-3 text-sm text-ink ring-1 ring-inset ring-ink/[0.08] ' +
    'transition-all duration-300 placeholder:text-clay ' +
    'focus:bg-bone-100 focus:outline-none focus:ring-2 focus:ring-terra ' +
    'disabled:opacity-50',

  /** Variante rectangular para textos largos y campos de varias líneas. */
  textarea:
    'w-full rounded-core bg-bone-200/70 px-5 py-3.5 text-sm leading-relaxed text-ink ring-1 ring-inset ring-ink/[0.08] ' +
    'transition-all duration-300 placeholder:text-clay ' +
    'focus:bg-bone-100 focus:outline-none focus:ring-2 focus:ring-terra',

  select:
    'w-full appearance-none rounded-full bg-bone-200/70 px-5 py-3 text-sm text-ink ring-1 ring-inset ring-ink/[0.08] ' +
    'transition-all duration-300 focus:bg-bone-100 focus:outline-none focus:ring-2 focus:ring-terra',

  hint: 'mt-1.5 text-[11px] leading-relaxed text-clay',

  /** Botón de envío a ancho completo, en píldora. */
  submit:
    'w-full rounded-full bg-ink py-3.5 text-xs font-medium uppercase tracking-wide2 text-bone shadow-lift ' +
    'transition-all duration-500 ease-haptic hover:bg-ink-700 active:scale-[0.98] ' +
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terra focus-visible:ring-offset-2 focus-visible:ring-offset-bone ' +
    'disabled:pointer-events-none disabled:opacity-45'
} as const;
