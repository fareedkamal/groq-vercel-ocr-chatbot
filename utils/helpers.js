'use client';

export const getLocalStorageItem = (key) => {
  if (typeof window !== 'undefined') {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }
  return null;
};

export const setLocalStorageItem = (key, value) => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(key, JSON.stringify(value));
  }
};

export const clearLocalStorage = () => {
  if (typeof window !== 'undefined') {
    return window.localStorage.clear();
  }
};
