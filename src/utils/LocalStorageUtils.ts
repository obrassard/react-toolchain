export function getLocalStorageJsonItem<T>(key: string): T | null {
  const rawValue = getLocalStorageItem(key);
  return parseLocationValue(rawValue);
}

export function parseLocationValue(rawValue: string | null) {
  if (rawValue === null) return null;
  try {
    return JSON.parse(rawValue);
  } catch (e) {
    return null;
  }
}

export function setLocalStorageJsonItem<T>(key: string, item: T) {
  setLocalStorageItem(key, JSON.stringify(item));
}

export function getLocalStorageItem<T = string>(key: string): T | null {
  return localStorage.getItem(key) as T | null;
}

export function setLocalStorageItem(key: string, item: string) {
  localStorage.setItem(key, item);
}

export function deleteLocalStorageItem(key: string) {
  localStorage.removeItem(key);
}
