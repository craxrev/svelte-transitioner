import { get, writable } from "svelte/store";
import { afterNavigate, beforeNavigate } from "$app/navigation";
import { getContext, onDestroy, onMount, setContext } from "svelte";


export const init = () => {
    
}

export const onGlobalEnter = (callback, isTimeline) => {
    setContext('globalEnterConfig', !isTimeline ? {
        tick: callback,
    } : {
        timeline: (node) => { // TODO: THIS IS TEMP
            const tl = callback(node);
            return {
                progress: (t) => null,
                duration: () => 0
            }
        }
    });
};
export const onGlobalLeave = (callback, isTimeline) => {
    setContext('globalLeaveConfig', !isTimeline ? {
        tick: callback,
    } : {
        timeline: (node) => { // TODO: THIS IS TEMP
            const tl = callback(node);
            return {
                progress: (t) => null,
                duration: () => 0
            }
        }
    });
};

export const lastLeaveDuration = writable(0);
export const onInit = (callback) => {
    setContext('initCallback', callback);
};
export const onEnter = (callback, duration) => {
    setContext('enterConfig', duration !== undefined ? {
        tick: callback,
        duration
    } : {
        timeline: (node) => { // TODO: THIS IS TEMP
            const tl = callback(node);
            return {
                progress: (t) => null,
                duration: () => 0
            }
        }
    });
};
export const onLeave = (callback, duration) => {
    setContext('leaveConfig', duration !== undefined ? {
        tick: callback,
        duration
    } : {
        timeline: (node) => { // TODO: THIS IS TEMP
            const tl = callback(node);
            return {
                progress: (t) => null,
                duration: () => 0
            }
        }
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