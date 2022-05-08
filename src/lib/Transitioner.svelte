<script lang="ts">
    import { getContext } from "svelte";
    import { get } from "svelte/store";

    import type { InitCallback, EnterConfig, LeaveConfig, CustomTimeline } from "$lib/transitioner";
    import { lastLeaveDuration } from '$lib/transitioner';
    
    type SvelteTick = (t: number, u: number) => void;

    const globalInitCallback: InitCallback = getContext('globalInitCallback');
    const globalEnterConfig: EnterConfig = getContext('globalEnterConfig');
    const globalLeaveConfig: LeaveConfig = getContext('globalLeaveConfig');

    const initCallback: InitCallback = getContext('initCallback');
    const enterConfig: EnterConfig = getContext('enterConfig');
    const leaveConfig: LeaveConfig = getContext('leaveConfig');

    const initAction = (node: HTMLElement) => {
        globalInitCallback && globalInitCallback(node);
        initCallback && initCallback(node);
    };
    const enter = (node: HTMLElement, _config: {}) => {
        const { tick = () => null, duration = 0, timeline } = enterConfig ?? { };
        const { tick: globalTick = () => null, duration: globalDuration = 0, timeline: globalTimeline } = globalEnterConfig ?? { };

        const delay = get(lastLeaveDuration) ?? 0;

        let tl: GSAPTimeline | CustomTimeline = {
            duration: () => duration / 1000,
            progress: (t: number) => tick(node, t)
        };
        let globalTl: GSAPTimeline | CustomTimeline = {
            duration: () => globalDuration / 1000,
            progress: (t: number) => globalTick(node, t)
        };
        let theDuration = 0;
        let theTick: SvelteTick = () => null;

        // Prepare timelines
        if (timeline) {
            tl = timeline(node);
            if (!tl?.duration || !tl?.progress) {
                throw 'Enter: not a component timeline object!';
            }
        }
        if (globalTimeline) {
            globalTl = globalTimeline(node);
            if (!globalTl?.progress || !globalTl?.duration) {
                throw 'Enter: not a global timeline object!';
            }
        }

        // Calculate animation duration and tick logic
        if (tl.duration() > globalTl.duration()) {
            const ratio = globalTl.duration() / tl.duration();

            theDuration = tl.duration() * 1000;
            theTick = (t) => {
                if (t <= ratio) {
                    globalTl.progress(t / ratio);
                }
                tl.progress(t);
            };
        } else if (globalTl.duration() > tl.duration()) {
            const ratio = tl.duration() / globalTl.duration();

            theDuration = globalTl.duration() * 1000;
            theTick = (t) => {
                if (t <= ratio) {
                    tl.progress(t / ratio);
                }
                globalTl.progress(t);
            };
        } else {
            theDuration = tl.duration() * 1000;
            theTick = (t) => {
                tl.progress(t);
                globalTl.progress(t);
            };
        }

        return {
            delay,
            duration: theDuration,
            tick: theTick,
        };
    };
    const leave = (node: HTMLElement, _config: {}) => {
        const { tick = () => null, duration = 0, timeline } = leaveConfig ?? { };
        const { tick: globalTick = () => null, duration: globalDuration, timeline: globalTimeline } = globalLeaveConfig ?? { };

        let tl: GSAPTimeline | CustomTimeline = {
            duration: () => duration / 1000,
            progress: (t: number) => tick(node, t)
        };
        let globalTl: GSAPTimeline | CustomTimeline = {
            duration: () => globalDuration / 1000,
            progress: (t: number) => globalTick(node, t)
        };
        let theDuration = 0;
        let theTick: SvelteTick = () => null;

        // Prepare timelines
        if (timeline) {
            tl = timeline(node);
            if (!tl?.duration || !tl?.progress) {
                throw 'Leave: not a component timeline object!';
            }
        }
        if (globalTimeline) {
            globalTl = globalTimeline(node);
            if (!globalTl?.progress || !globalTl?.duration) {
                throw 'Leave: not a global timeline object!';
            }
        }

        // Calculate animation duration and tick logic
        if (tl.duration() > globalTl.duration()) {
            const ratio = globalTl.duration() / tl.duration();

            theDuration = tl.duration() * 1000;
            theTick = (_, t) => {
                if (t <= ratio) {
                    globalTl.progress(t / ratio);
                }
                tl.progress(t);
            };
        } else if (globalTl.duration() > tl.duration()) {
            const ratio = tl.duration() / globalTl.duration();

            theDuration = globalTl.duration() * 1000;
            theTick = (_, t) => {
                if (t <= ratio) {
                    tl.progress(t / ratio);
                }
                globalTl.progress(t);
            };
        } else {
            theDuration = tl.duration() * 1000;
            theTick = (_, t) => {
                tl.progress(t);
                globalTl.progress(t);
            };
        }

        lastLeaveDuration.set(theDuration);

        return {
            duration: theDuration,
            tick: theTick,
        };
    };
</script>

<div class="transition-wrapper" in:enter out:leave use:initAction>
    <slot />
</div>
