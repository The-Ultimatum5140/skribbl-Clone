const storage = {
  get(key) {
    const value = localStorage.getItem(key);

    if (!value) return null;

    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  },

  set(key, value) {
    const data = typeof value === "string" ? value : JSON.stringify(value);

    localStorage.setItem(key, data);
  },

  remove(key) {
    localStorage.removeItem(key);
  },

  clear() {
    localStorage.clear();
  },
};

export default storage;
