export const getItem = (key) => {

    const item = localStorage.getItem(key);
    if (!item) return "";
    return JSON.parse(item);

};

export const setItem = (key, item) => {

    const itemToSet = JSON.stringify(item);
    localStorage.setItem(key, itemToSet);

};