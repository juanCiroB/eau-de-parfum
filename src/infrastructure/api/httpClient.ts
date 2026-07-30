/**
 * Cliente HTTP base (FASE 2). Hoy no se usa: los repositorios son en memoria.
 * Queda listo para que los repositorios HTTP reales lo reutilicen, centralizando
 * baseURL, headers de auth y manejo de errores en un solo lugar.
 */
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? '';

export async function httpGet<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...init,
    headers: { 'Content-Type': 'application/json', ...init?.headers }
  });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} en ${path}`);
  }
  return res.json() as Promise<T>;
}
