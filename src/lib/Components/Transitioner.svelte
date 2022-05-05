<script>
    import { getContext, setContext } from "svelte";
    import { get } from "svelte/store";
    import { fly } from "svelte/transition";

    import { lastLeaveDuration } from '$lib/transitioner';

    const globalEnterConfig = getContext('globalEnterConfig');
    const globalLeaveConfig = getContext('globalLeaveConfig');

    const initCallback = getContext('initCallback');
    const enterConfig = getContext('enterConfig');
    const leaveConfig = getContext('leaveConfig');

    const initAction = (node) => {
        initCallback && initCallback(node);
    };
    const enter = (node) => {
        const { tick, timeline, duration = 0 } = enterConfig ?? { };
        const { tick: globalTick, timeline: globalTimeline } = globalEnterConfig ?? { };

        const delay = get(lastLeaveDuration) ?? 0;

        let globalTl;
        let tl;
        let theDuration = 0;
        let theTick = () => null;

        if (globalTimeline) {
            globalTl = globalTimeline(node);
            if (!globalTl?.progress || !globalTl?.duration) {
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
            } : (t) => {
                globalTick(node, t);
                tick(node, t);
            };
        }

        return {
            delay,
            duration: theDuration,
            tick: theTick,
        };
    };
    const leave = (node) => {
        const { tick, timeline, duration = 0 } = leaveConfig ?? { };
        const { tick: globalTick, timeline: globalTimeline } = globalLeaveConfig ?? { };

        let globalTl;
        let tl;
        let theDuration = 0;
        let theTick = () => null;

        if (globalTimeline) {
            globalTl = globalTimeline(node);
            if (!globalTl?.progress || !globalTl?.duration) {
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
            } : (t) => {
                globalTick(node, t);
                tick(node, t);
            };
        }

        lastLeaveDuration.set(theDuration);

        return {
            duration: theDuration,
            tick: theTick,
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