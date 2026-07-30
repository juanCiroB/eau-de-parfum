import type { Config } from 'tailwindcss';

/**
 * Sistema de design tokens de EAU DE PARFUM.
 * La identidad: lujo moderno, minimalismo editorial, oro champaña discreto.
 * Toda decisión de color/tipografía nace aquí para mantener coherencia.
 */
const config: Config = {
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/presentation/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        // Negro profundo (fondo principal de secciones oscuras)
        noir: {
          DEFAULT: '#0B0B0C',
          900: '#0B0B0C',
          800: '#141416',
          700: '#1C1C1F'
        },
        // Blanco cálido (no #FFFFFF puro: más premium, menos clínico)
        ivory: {
          DEFAULT: '#FAFAF7',
          100: '#FAFAF7',
          200: '#F2F1EC'
        },
        // Gris suave para texto secundario y bordes
        smoke: {
          DEFAULT: '#8C8C88',
          light: '#C9C9C4',
          dark: '#5A5A57'
        },
        // Oro champaña como ÚNICO acento. Discreto, no estridente.
        gold: {
          DEFAULT: '#C2A661',
          light: '#D8C089',
          dark: '#9C8246'
        }
      },
      fontFamily: {
        // Display: serif de alto contraste para nombres de fragancia y titulares
        display: ['var(--font-display)', 'Cormorant Garamond', 'serif'],
        // Cuerpo / utilitario: grotesca geométrica con aire art déco
        sans: ['var(--font-sans)', 'Jost', 'system-ui', 'sans-serif']
      },
      letterSpacing: {
        luxe: '0.28em',
        wide2: '0.16em'
      },
      maxWidth: {
        content: '1280px'
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        }
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-in': 'fade-in 0.6s ease both'
      }
    }
  },
  plugins: []
};

export default config;
