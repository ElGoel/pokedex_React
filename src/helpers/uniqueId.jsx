export function uniqueById(items) {
    const set = new Set();
    return items.filter((item) => {
      const isDuplicate = set.has(item.data.id);
      set.add(item.data.id);
      return !isDuplicate;
    });
  }

export function uniqueByName(items) {
    const set = new Set();
    return items.filter((item) => {
      const isDuplicate = set.has(item.id);
      set.add(item.id);
      return !isDuplicate;
    });
}