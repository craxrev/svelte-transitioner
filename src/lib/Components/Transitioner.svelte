<script lang="ts">
    import { getContext } from "svelte";
    import { get } from "svelte/store";
    import { fly } from "svelte/transition";

    import type { GlobalEnterConfig, GlobalLeaveConfig, EnterConfig, InitCallback, LeaveConfig, Tick } from "$lib";
    import { lastLeaveDuration } from '$lib';
    
    type SvelteTick = (t: number, u: number) => void;

    const globalEnterConfig: GlobalEnterConfig = getContext('globalEnterConfig');
    const globalLeaveConfig: GlobalLeaveConfig = getContext('globalLeaveConfig');

    const initCallback: InitCallback = getContext('initCallback');
    const enterConfig: EnterConfig = getContext('enterConfig');
    const leaveConfig: LeaveConfig = getContext('leaveConfig');

    const initAction = (node: HTMLElement) => {
        initCallback && initCallback(node);
    };
    const enter = (node: HTMLElement, _config: {}) => {
        const { tick, timeline, duration = 0 } = enterConfig ?? { };
        const { tick: globalTick, timeline: globalTimeline } = globalEnterConfig ?? { };

        const delay = get(lastLeaveDuration) ?? 0;

        let globalTl;
        let tl;
        let theDuration = 0;
        let theTick: SvelteTick = () => null;

        if (globalTimeline) {
            globalTl = globalTimeline(node);
            if (!globalTl?.duration || !globalTl?.progress) {
                throw 'Enter: not a global timeline object!';
            }
        }
        if (timeline) {
            tl = timeline(node);
            if (!tl?.progress || !tl?.duration) {
                throw 'Enter: not a component timeline object!';
            }
        }

        if (timeline) {
            theDuration = tl.duration() * 1000;
            theTick = globalTimeline ? (t) => {
                globalTl.progress(t);
                tl.progress(t);
            } : (t) => {
                tl.progress(t);
            };
        } else if (tick) {
            theDuration = duration;
            theTick = globalTimeline ? (t) => {
                globalTl.progress(t);
                tick(node, t);
            } : globalTick ? (t) => {
                globalTick(node, t);
                tick(node, t);
            } : (t) => {
                tick(node, t);
            };
        }

        const { css } = fly(node, { delay, duration: theDuration });

        return {
            delay,
            duration: theDuration,
            tick: theTick,
            // css,
        };
    };
    const leave = (node: HTMLElement, _config: {}) => {
        const { tick, timeline, duration = 0 } = leaveConfig ?? { };
        const { tick: globalTick, timeline: globalTimeline } = globalLeaveConfig ?? { };

        let globalTl;
        let tl;
        let theDuration = 0;
        let theTick: SvelteTick = () => null;

        if (globalTimeline) {
            globalTl = globalTimeline(node);
            if (!globalTl?.duration || !globalTl?.progress) {
                throw 'Leave: not a global timeline object!';
            }
        }
        if (timeline) {
            tl = timeline(node);
            if (!tl?.progress || !tl?.duration) {
                throw 'Leave: not a component timeline object!';
            }
        }

        if (timeline) {
            theDuration = tl.duration() * 1000;
            theTick = globalTimeline ? (_, t) => {
                globalTl.progress(t);
                tl.progress(t);
            } : (_, t) => {
                tl.progress(t);
            };
        } else if (tick) {
            theDuration = duration;
            theTick = globalTimeline ? (_, t) => {
                globalTl.progress(t);
                tick(node, t);
            } : globalTick ? (_, t) => {
                globalTick(node, t);
                tick(node, t);
            } : (_, t) => {
                tick(node, t);
            };
        }

        lastLeaveDuration.set(theDuration);

        const { css } = fly(node, { duration: theDuration });

        return {
            duration: theDuration,
            tick: theTick,
            // css,
        };
    };
</script>

<!-- <div class="transition" /> -->
<div class="transition-wrapper" in:enter out:leave use:initAction>
    <slot />
</div>

<style>
    .transition {
        position: fixed;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        background-color: aqua;
        opacity: 0.5;
        pointer-events: none;
    }
</style>