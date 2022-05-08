import { setContext } from "svelte";
import { writable } from "svelte/store";

export interface CustomTimeline {
    duration: () => number;
    progress: (t: number) => void;
};
export type NodeTick = (node: HTMLElement, t: number) => void;
export type NodeTimeline = (node: HTMLElement) => CustomTimeline;
export type NodeCallback = (node: HTMLElement) => void;
export interface IntroConfig {
    tick?: NodeTick;
    timeline?: NodeTimeline;
    duration?: number;
};
export interface OutroConfig {
    tick?: NodeTick;
    timeline?: NodeTimeline;
    duration?: number;
};

export const lastOutroDuration = writable(0)

export const onGlobalInit = (callback: NodeCallback) => {
    setContext('globalInitCallback', callback);
};
export const onGlobalIntroStart = (callback: NodeCallback) => {
    setContext('globalIntroStartCallback', callback);
};
export const onGlobalOutroStart = (callback: NodeCallback) => {
    setContext('globalOutroStartCallback', callback);
};
export const onGlobalIntroEnd = (callback: NodeCallback) => {
    setContext('globalIntroEndCallback', callback);
};
export const onGlobalOutroEnd = (callback: NodeCallback) => {
    setContext('globalOutroEndCallback', callback);
};
export const globalIntro = (callback: NodeTick | NodeTimeline, duration?: number) => {
    setContext('globalIntroConfig', duration !== undefined ? {
        tick: callback,
        duration
    } : {
        timeline: callback
    });
};
export const globalOutro = (callback: NodeTick | NodeTimeline, duration?: number) => {
    setContext('globalOutroConfig', duration !== undefined ? {
        tick: callback,
        duration
    } : {
        timeline: callback
    });
};

export const onInit = (callback: NodeCallback) => {
    setContext('initCallback', callback);
};
export const onIntroStart = (callback: NodeCallback) => {
    setContext('introStartCallback', callback);
};
export const onOutroStart = (callback: NodeCallback) => {
    setContext('outroStartCallback', callback);
};
export const onIntroEnd = (callback: NodeCallback) => {
    setContext('introEndCallback', callback);
};
export const onOutroEnd = (callback: NodeCallback) => {
    setContext('outroEndCallback', callback);
};
export const intro = (callback: NodeTick | NodeTimeline, duration?: number) => {
    setContext('introConfig', duration !== undefined ? {
        tick: callback,
        duration
    } : {
        timeline: callback
    });
};
export const outro = (callback: NodeTick | NodeTimeline, duration?: number) => {
    setContext('outroConfig', duration !== undefined ? {
        tick: callback,
        duration
    } : {
        timeline: callback
    });
};
