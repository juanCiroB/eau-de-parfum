interface AttemptRecord {
  count: number;
  resetAt: number;
}

// In-memory: works in dev. For multi-instance production, replace with Redis.
const store = new Map<string, AttemptRecord>();

export function checkRateLimit(
  key: string,
  maxAttempts = 5,
  windowMs = 15 * 60 * 1000
): boolean {
  const now = Date.now();
  const record = store.get(key);

  if (!record || now > record.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (record.count >= maxAttempts) return false;
  record.count += 1;
  return true;
}
