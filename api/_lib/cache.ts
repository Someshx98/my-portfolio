interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

const memoryStore = new Map<string, CacheEntry<any>>();
const lastKnownGoodStore = new Map<string, any>();

export const memoryCache = {
  get<T>(key: string, ttlMs: number): T | null {
    const entry = memoryStore.get(key);
    if (!entry) return null;
    if (Date.now() - entry.timestamp > ttlMs) {
      return null;
    }
    return entry.data as T;
  },

  set<T>(key: string, data: T): void {
    const now = Date.now();
    memoryStore.set(key, { data, timestamp: now });
    lastKnownGoodStore.set(key, data);
  },

  getLastKnownGood<T>(key: string): T | null {
    const data = lastKnownGoodStore.get(key);
    if (data) return data as T;
    const entry = memoryStore.get(key);
    return entry ? (entry.data as T) : null;
  },

  clear(key?: string): void {
    if (key) {
      memoryStore.delete(key);
      lastKnownGoodStore.delete(key);
    } else {
      memoryStore.clear();
      lastKnownGoodStore.clear();
    }
  },
};
