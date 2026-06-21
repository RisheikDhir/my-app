// ─── Storage Adapter Abstraction ──────────────────────────────────────────────
// All persistence goes through this interface.
// Swap LocalStorageAdapter for an IndexedDbAdapter or API adapter in the future
// without touching any consumer code.

export abstract class StorageAdapter {
  abstract get<T>(key: string): T | null;
  abstract set<T>(key: string, value: T): void;
  abstract remove(key: string): void;
  abstract clear(): void;
  abstract has(key: string): boolean;
  abstract keys(): string[];

  /** Convenience: get with a fallback default */
  getOrDefault<T>(key: string, defaultValue: T): T {
    const val = this.get<T>(key);
    return val !== null ? val : defaultValue;
  }

  /** Convenience: update a stored object by merging a partial patch */
  patch<T extends object>(key: string, patch: Partial<T>): T | null {
    const current = this.get<T>(key);
    if (current === null) return null;
    const updated = { ...current, ...patch };
    this.set(key, updated);
    return updated;
  }
}
