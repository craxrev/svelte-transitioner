import { setContext } from "svelte";
import { writable } from "svelte/store";

export interface CustomTimeline {
    duration: () => number;
    progress: (t: number) => void;
};
export type NodeTick = (node: HTMLElement, t: number) => void;
export type NodeTimeline = (node: HTMLElement) => CustomTimeline | GSAPTimeline;
export type InitCallback = (node: HTMLElement) => void;
export interface EnterConfig {
    tick?: NodeTick;
    timeline?: NodeTimeline;
    duration?: number;
};
export interface LeaveConfig {
    tick?: NodeTick;
    timeline?: NodeTimeline;
    duration?: number;
};

export const onGlobalInit = (callback: InitCallback) => {
    setContext('globalInitCallback', callback);
};

export const onGlobalEnter = (callback: NodeTick | NodeTimeline, duration?: number) => {
    setContext('globalEnterConfig', duration !== undefined ? {
        tick: callback,
        duration
    } : {
        timeline: callback
    });
};
export const onGlobalLeave = (callback: NodeTick | NodeTimeline, duration?: number) => {
    setContext('globalLeaveConfig', duration !== undefined ? {
        tick: callback,
        duration
    } : {
        timeline: callback
    });
};

export const lastLeaveDuration = writable(0);
export const onInit = (callback: InitCallback) => {
    setContext('initCallback', callback);
};
export const onEnter = (callback: NodeTick | NodeTimeline, duration?: number) => {
    setContext('enterConfig', duration !== undefined ? {
        tick: callback,
        duration
    } : {
        timeline: callback
    });
};
export const onLeave = (callback: NodeTick | NodeTimeline, duration?: number) => {
    setContext('leaveConfig', duration !== undefined ? {
        tick: callback,
        duration
    } : {
        timeline: callback
    });
};
