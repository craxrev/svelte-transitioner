import { get } from "svelte/store";

import { navigating } from "./transitioner";

export const sleep = async (n) => {
    await new Promise(r => setTimeout(r, n*1000));
};

export const rand = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

// Regular debounce: call last only until delay of last trigger is expired
export const debounce = () => {
    let timerId;

    return (func, delay) => {
        const isNavigating = get(navigating);
        // console.log('navigating:', isNavigating);

        clearTimeout(timerId);

        if (!isNavigating || true) {
            timerId = setTimeout(() => func(), delay);
        }
    };
};

// Inverse debounce: call first only until delay of last trigger is expired
export const unbounce = () => {
    let timerId;
    let canCall = true;

    return (func, delay) => {

        if (canCall) {
            func();
            canCall = false;
        }

        clearTimeout(timerId);
        
        timerId = setTimeout(() => {
            canCall = true;
        }, delay);
    };
};
