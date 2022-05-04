import { get, writable } from "svelte/store";
import { afterNavigate, beforeNavigate } from "$app/navigation";
import { getContext, onDestroy, onMount, setContext } from "svelte";


export const init = () => {
    beforeNavigate(() => {
        // console.log('beforeNavigate');
    });
    
    afterNavigate(() => {
        // console.log('afterNavigate');
    });
}

export const lastLeaveDuration = writable(0);

export const onInit = (callback) => {
    setContext('initCallback', callback);
};
export const onEnter = (callback, duration, path) => {
    setContext('enterConfig', {
        callback,
        duration,
    });
};
export const onLeave = (callback, duration, path) => {
    setContext('leaveConfig', {
        callback,
        duration
    });
};

/*

(
    (node, t) => void,
    duration
)

(
    timeline
)

*/