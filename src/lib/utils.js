import { get } from "svelte/store";

import { navigating } from "./transitioner";

export const sleep = async (n) => {
    await new Promise(r => setTimeout(r, n*1000));
};

export const rand = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};
