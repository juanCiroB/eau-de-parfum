/** @type {import('next').NextConfig} */

const isDev = process.env.NODE_ENV === 'development';

const securityHeaders = [
  // Evita que la página sea embebida en iframes (clickjacking)
  { key: 'X-Frame-Options', value: 'DENY' },
  // Evita que el navegador adivine el tipo MIME
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  // Política de referrer conservadora
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // Desactiva funciones de hardware innecesarias
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=()' },
  // XSS filter legacy (navegadores antiguos)
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  // HSTS: fuerza HTTPS en producción (1 año)
  ...(!isDev ? [{ key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' }] : []),
  // Content Security Policy
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      // Next.js necesita unsafe-inline para estilos de Tailwind; unsafe-eval solo en dev (HMR)
      `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''}`,
      "style-src 'self' 'unsafe-inline'",
      // Imágenes propias + CDN de fragancias + datos inline
      "img-src 'self' data: https://fimgs.net https://images.unsplash.com",
      "font-src 'self'",
      // Peticiones XHR/fetch solo al mismo origen
      "connect-src 'self'",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'"
    ].join('; ')
  }
];

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'fimgs.net' }
    ]
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders
      }
    ];
  }
};

export default nextConfig;
