// tslint:disable:no-console

export const getItem = (key: string, json = false) => {
  try {
    const item = localStorage.getItem(key);
    return item ? (json ? JSON.parse(item) : item) : null;
  } catch (error) {
    console.error(`Failed to get ${key}`);
  }
};

export const setItem = (key: string, value: string) => {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.error(`Failed to set ${key}`);
  }
};
