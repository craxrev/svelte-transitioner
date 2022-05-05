import { writable } from "svelte/store";
import { setContext } from "svelte";

export type Tick = (node: HTMLElement, t: number) => void;
export type Timeline = (node: HTMLElement) => {
    duration: () => number;
    progress: (t) => void;
};
export interface GlobalEnterConfig {
    tick?: Tick;
    timeline?: Timeline;
};
export interface GlobalLeaveConfig {
    tick?: Tick;
    timeline?: Timeline;
};
export type InitCallback = (node: HTMLElement) => void;
export interface EnterConfig {
    tick?: Tick;
    timeline?: Timeline;
    duration?: number;
};
export interface LeaveConfig {
    tick?: Tick;
    timeline?: Timeline;
    duration?: number;
};

export const init = () => {
    
};

export const onGlobalEnter = (callback: Tick | Timeline, isTimeline: boolean) => {
    setContext('globalEnterConfig', !isTimeline ? {
        tick: callback,
    } : {
        timeline: callback
    });
};
export const onGlobalLeave = (callback: Tick | Timeline, isTimeline: boolean) => {
    setContext('globalLeaveConfig', !isTimeline ? {
        tick: callback,
    } : {
        timeline: callback
    });
};

export const lastLeaveDuration = writable(0);
export const onInit = (callback: InitCallback) => {
    setContext('initCallback', callback);
};
export const onEnter = (callback: Tick | Timeline, duration?: number) => {
    setContext('enterConfig', duration !== undefined ? {
        tick: callback,
        duration
    } : {
        timeline: callback
    });
};
export const onLeave = (callback: Tick | Timeline, duration?: number) => {
    setContext('leaveConfig', duration !== undefined ? {
        tick: callback,
        duration
    } : {
        timeline: callback
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