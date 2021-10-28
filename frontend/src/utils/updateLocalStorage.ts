const updateLocalStorage = (key: string, value: string) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log(error);
  }
};

export default updateLocalStorage;
