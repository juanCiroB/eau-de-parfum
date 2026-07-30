import type { Config } from 'tailwindcss';

/**
 * Sistema de design tokens de EAU DE PARFUM.
 *
 * Identidad: perfumería editorial. Papel hueso, tinta cálida y un único acento
 * terracota — el color del jugo, no del envase. Sin negro puro ni oro:
 * el lujo aquí viene del aire, la tipografía y el detalle, no del contraste bruto.
 *
 * Toda decisión de color/tipografía/movimiento nace aquí.
 */
const config: Config = {
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/presentation/**/*.{ts,tsx}',
    // Los estados de pedido definen sus clases de color aquí: sin este glob,
    // Tailwind no genera `bg-amber-700`, `text-sky-700`, etc.
    './src/lib/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        // Papel: fondo principal. Hueso cálido, nunca #FFF clínico.
        bone: {
          DEFAULT: '#F7F4EE',
          100: '#FBF9F5',
          200: '#F1ECE3',
          300: '#E7E0D4'
        },
        // Tinta: texto y secciones oscuras. Marrón muy profundo, no negro.
        ink: {
          DEFAULT: '#191512',
          900: '#191512',
          800: '#241E19',
          700: '#332B24',
          600: '#4A4038'
        },
        // Grises cálidos (una sola familia, tintada hacia el papel).
        clay: {
          DEFAULT: '#8A8073',
          light: '#B4AA9C',
          dark: '#635B51'
        },
        // Acento ÚNICO: terracota quemada. Desaturado, editorial.
        terra: {
          DEFAULT: '#8C3D2E',
          light: '#A85B49',
          dark: '#68291D'
        }
      },
      fontFamily: {
        // Display: serif variable de alto contraste con carácter propio.
        display: ['var(--font-display)', 'Fraunces', 'Georgia', 'serif'],
        // Cuerpo: grotesca contemporánea, ligeramente estrechada.
        sans: ['var(--font-sans)', 'Instrument Sans', 'system-ui', 'sans-serif'],
        // Cifras: precios, stock, referencias. Tabular siempre.
        mono: ['var(--font-mono)', 'JetBrains Mono', 'ui-monospace', 'monospace']
      },
      letterSpacing: {
        luxe: '0.24em',
        wide2: '0.12em',
        tighter2: '-0.03em'
      },
      maxWidth: {
        content: '1320px',
        prose2: '62ch'
      },
      borderRadius: {
        shell: '1.75rem',
        core: '1.375rem'
      },
      transitionTimingFunction: {
        // Curva "peso físico": arranca rápido, asienta lento.
        haptic: 'cubic-bezier(0.32, 0.72, 0, 1)',
        soft: 'cubic-bezier(0.22, 1, 0.36, 1)'
      },
      boxShadow: {
        // Sombras tintadas con el hue del papel, nunca negro puro.
        lift: '0 1px 2px rgba(25,21,18,0.04), 0 12px 32px -12px rgba(25,21,18,0.14)',
        'lift-lg': '0 2px 4px rgba(25,21,18,0.05), 0 32px 64px -24px rgba(25,21,18,0.22)',
        bezel: 'inset 0 1px 0 rgba(255,255,255,0.6)',
        'bezel-dark': 'inset 0 1px 0 rgba(255,255,255,0.08)'
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }
        },
        'sheen': {
          '0%': { transform: 'translateX(-120%)' },
          '100%': { transform: 'translateX(220%)' }
        }
      },
      animation: {
        'fade-up': 'fade-up 0.8s cubic-bezier(0.32, 0.72, 0, 1) both',
        'fade-in': 'fade-in 0.6s ease both',
        marquee: 'marquee 42s linear infinite',
        sheen: 'sheen 1.1s cubic-bezier(0.32, 0.72, 0, 1)'
      },
      zIndex: {
        nav: '30',
        drawer: '40',
        overlay: '45',
        grain: '60'
      }
    }
  },
  plugins: []
};

export default config;
