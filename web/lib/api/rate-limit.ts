import { RATE_LIMIT } from "@/lib/constants";

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const store = new Map<string, RateLimitEntry>();

export type RateLimitResult = {
  allowed: boolean;
  retryAfterMs?: number;
  remaining?: number;
};

function pruneExpired(now: number): void {
  for (const [key, entry] of store) {
    if (now >= entry.resetAt) {
      store.delete(key);
    }
  }
}

export function checkRateLimit(ip: string): RateLimitResult {
  const now = Date.now();
  pruneExpired(now);

  const entry = store.get(ip);

  if (!entry || now >= entry.resetAt) {
    store.set(ip, { count: 1, resetAt: now + RATE_LIMIT.WINDOW_MS });
    return {
      allowed: true,
      remaining: RATE_LIMIT.MAX_REQUESTS - 1,
    };
  }

  if (entry.count >= RATE_LIMIT.MAX_REQUESTS) {
    return {
      allowed: false,
      retryAfterMs: entry.resetAt - now,
      remaining: 0,
    };
  }

  entry.count += 1;
  return {
    allowed: true,
    remaining: RATE_LIMIT.MAX_REQUESTS - entry.count,
  };
}

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }

  return request.headers.get("x-real-ip") ?? "unknown";
}