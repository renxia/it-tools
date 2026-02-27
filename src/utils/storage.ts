/**
 * localStorage-backed cache with TTL (expiration) support.
 *
 * 特性：
 * - 使用 `localStorage` 保存数据，结构为 `{ v: value, e: expiryTimestamp|null }`。
 * - 支持每项设置 ttl（秒），ttl 到期后自动过期并在下一次访问时清理。
 * - 当 `localStorage` 不可用时，回退为内存实现（Map），行为一致。
 * - 支持命名空间前缀，避免和其他 storage 冲突。
 */

type StoredValue<T> = {
	v: T;
	// expiry timestamp in ms since epoch, or null for never expire
	e: number | null;
};

export interface StorageCache {
	set<T = any>(key: string, value: T, ttlSeconds?: number | null): void;
	get<T = any>(key: string): T | null;
	remove(key: string): void;
	has(key: string): boolean;
	clear(): void;
	keys(): string[];
	size(): number;
	// 强制执行一次清理（同步）
	cleanup(): void;
}

function canUseLocalStorage(): boolean {
	try {
		if (typeof window === 'undefined' || !window?.localStorage) return false;
		const testKey = '__storage_test__';
		window.localStorage.setItem(testKey, '1');
		window.localStorage.removeItem(testKey);
		return true;
	} catch (e) {
		return false;
	}
}

/**
 * 创建一个 localStorage 缓存实例
 * @param prefix key 前缀（会自动加在每个 key 前面），默认 `ittools:`
 */
export function createStorageCache(prefix = 'ittools:'): StorageCache {
	const useLS = canUseLocalStorage();
	const memory = new Map<string, string>();

	const getItemRaw = (fullKey: string): string | null => {
		try {
			if (useLS) return window.localStorage.getItem(fullKey);
			return memory.has(fullKey) ? (memory.get(fullKey) as string) : null;
		} catch (e) {
			return null;
		}
	};

	const setItemRaw = (fullKey: string, val: string): void => {
		try {
			if (useLS) window.localStorage.setItem(fullKey, val);
			else memory.set(fullKey, val);
		} catch (e) {
			// ignore
		}
	};

	const removeItemRaw = (fullKey: string): void => {
		try {
			if (useLS) window.localStorage.removeItem(fullKey);
			else memory.delete(fullKey);
		} catch (e) {
			// ignore
		}
	};

	const iterateKeys = (): string[] => {
		try {
			if (useLS) {
				const out: string[] = [];
				for (let i = 0; i < window.localStorage.length; i++) {
					const k = window.localStorage.key(i);
					if (k && k.startsWith(prefix)) out.push(k);
				}
				return out;
			} else {
				return Array.from(memory.keys()).filter(k => k.startsWith(prefix));
			}
		} catch (e) {
			return [];
		}
	};

	const now = () => Date.now();

	const getFullKey = (key: string) => `${prefix}${key}`;

	const cleanup = (): void => {
		const keys = iterateKeys();
		for (const fullKey of keys) {
			const raw = getItemRaw(fullKey);
			if (!raw) continue;
			try {
				const parsed = JSON.parse(raw) as StoredValue<any>;
				if (parsed && parsed.e !== null && parsed.e <= now()) {
					removeItemRaw(fullKey);
				}
			} catch (e) {
				// if parse fails, remove to avoid stale/broken data
				removeItemRaw(fullKey);
			}
		}
	};

	return {
		set<T = any>(key: string, value: T, ttlSeconds: number | null = null): void {
			if (key == null || key === '') return;
			const expiry = ttlSeconds == null ? null : now() + ttlSeconds * 1000;
			const payload: StoredValue<T> = { v: value, e: expiry };
			try {
				const fullKey = getFullKey(key);
				setItemRaw(fullKey, JSON.stringify(payload));
			} catch (e) {
				// ignore serialization errors
			}
		},

		get<T = any>(key: string): T | null {
			if (key == null || key === '') return null;
			const fullKey = getFullKey(key);
			try {
				const raw = getItemRaw(fullKey);
				if (!raw) return null;
				const parsed = JSON.parse(raw) as StoredValue<T>;
				if (parsed.e !== null && parsed.e <= now()) {
					removeItemRaw(fullKey);
					return null;
				}
				return parsed.v as T;
			} catch (e) {
				// on any error, remove the item to avoid future errors
				removeItemRaw(fullKey);
				return null;
			}
		},

		remove(key: string): void {
			removeItemRaw(getFullKey(key));
		},

		has(key: string): boolean {
			const fullKey = getFullKey(key);
			try {
				const raw = getItemRaw(fullKey);
				if (!raw) return false;
				const parsed = JSON.parse(raw) as StoredValue<any>;
				if (parsed.e !== null && parsed.e <= now()) {
					removeItemRaw(fullKey);
					return false;
				}
				return true;
			} catch (e) {
				removeItemRaw(fullKey);
				return false;
			}
		},

		clear(): void {
			const keys = iterateKeys();
			for (const k of keys) removeItemRaw(k);
		},

		keys(): string[] {
			return iterateKeys().map(k => k.slice(prefix.length));
		},

		size(): number {
			return iterateKeys().length;
		},

		cleanup,
	};
}

// 默认实例，使用默认前缀
export const storage = createStorageCache();

export default storage;
