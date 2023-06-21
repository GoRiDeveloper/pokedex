import { setItem, getItem } from "./localStorage";

export const saveSession = (key, value) => {

    if (!key) throw "Key Not Found";
    const setData = {
        data: value,
        date: Date.now()
    };
    setItem(key, setData);

};

export const getSession = (key) => {

    if (!key) throw "Key Not Found";
    const GET_DATA = getItem(key);
    const DATE = Date.now();

    if (DATE - GET_DATA.date > (24 * 60 * 60 * 1000)) {
        localStorage.removeItem(key);
        return "";
    };

    return GET_DATA.data;

};