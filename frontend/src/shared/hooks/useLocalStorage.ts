export const useLocalStorage = () => {
  const setToLocalStorage = (key: string, value: object | string) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const getFromLocalStorage = (key: string) => {
    let value = localStorage.getItem(key);

    if (value) {
      return JSON.parse(value);
    } else {
      return null;
    }
  };

  const removeFromLocalStorage = (key: string) => {
    localStorage.removeItem(key);
  };

  return {
    setToLocalStorage,
    getFromLocalStorage,
    removeFromLocalStorage
  };
};
