export function generateResetToken(): string {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function passwordError(password: string): string | null {
  if (password.length < 8)      return 'Mínimo 8 caracteres';
  if (!/[A-Z]/.test(password))  return 'Debe incluir al menos una mayúscula';
  if (!/[a-z]/.test(password))  return 'Debe incluir al menos una minúscula';
  if (!/[0-9]/.test(password))  return 'Debe incluir al menos un número';
  return null;
}

export function isStrongPassword(password: string): boolean {
  return passwordError(password) === null;
}
