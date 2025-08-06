const DEFAULT_TTL_MINUTES = 60;

export const storage = {
  set: (key: string, value: any, ttl?: number) => {
    const now = new Date();
    const item = {
      value,
      expiry: (ttl ?? DEFAULT_TTL_MINUTES)
        ? now.getTime() + (ttl ?? DEFAULT_TTL_MINUTES) * 60 * 1000
        : undefined,
    };
    localStorage.setItem(key, JSON.stringify(item));
  },

  get: (key: string) => {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) return null;

    try {
      const item = JSON.parse(itemStr);
      const now = new Date();

      if (item.expiry && now.getTime() > item.expiry) {
        localStorage.removeItem(key);
        return null;
      }
      return item.value;
    } catch (error) {
      console.error(`Failed to parse item from storage key: ${key}`, error);
      return null;
    }
  },

  remove: (key: string) => {
    localStorage.removeItem(key);
  },

  clear: () => {
    localStorage.clear();
  },
};
