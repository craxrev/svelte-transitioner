<script lang="ts">
    import { getContext } from "svelte";
    import { get } from "svelte/store";

    import type { NodeCallback, IntroConfig, OutroConfig, CustomTimeline } from "$lib/transitioner";
    import { lastOutroDuration } from '$lib/transitioner';
    
    type SvelteTick = (t: number, u: number) => void;

    const globalInitCallback: NodeCallback = getContext('globalInitCallback');
    const globalIntroStartCallback: NodeCallback = getContext('globalIntroStartCallback');
    const globalOutroStartCallback: NodeCallback = getContext('globalOutroStartCallback');
    const globalIntroEndCallback: NodeCallback = getContext('globalIntroEndCallback');
    const globalOutroEndCallback: NodeCallback = getContext('globalOutroEndCallback');
    const globalIntroConfig: IntroConfig = getContext('globalIntroConfig');
    const globalOutroConfig: OutroConfig = getContext('globalOutroConfig');

    const initCallback: NodeCallback = getContext('initCallback');
    const introStartCallback: NodeCallback = getContext('introStartCallback');
    const outroStartCallback: NodeCallback = getContext('outroStartCallback');
    const introEndCallback: NodeCallback = getContext('introEndCallback');
    const outroEndCallback: NodeCallback = getContext('outroEndCallback');
    const introConfig: IntroConfig = getContext('introConfig');
    const outroConfig: OutroConfig = getContext('outroConfig');

    const initAction = (node: HTMLElement) => {
        globalInitCallback && globalInitCallback(node);
        initCallback && initCallback(node);
    };
    const intro = (node: HTMLElement, _config: {}) => {
        const { tick = () => null, duration = 0, timeline } = introConfig ?? { };
        const { tick: globalTick = () => null, duration: globalDuration = 0, timeline: globalTimeline } = globalIntroConfig ?? { };

        const delay = get(lastOutroDuration) ?? 0;

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

        let hasStarted = false;
        let isGlobalTlFinished = false;
        let isTlFinished = false;

        // Calculate animation duration and tick logic
        if (tl.duration() > globalTl.duration()) {
            const ratio = globalTl.duration() / tl.duration();

            theDuration = tl.duration() * 1000;
            theTick = (t) => {
                if (!hasStarted && t !== 0) {
                    hasStarted = true;

                    introStartCallback && introStartCallback(node);
                    globalIntroStartCallback && globalIntroStartCallback(node);
                }
                if (t < ratio) {
                    globalTl.progress(t / ratio);
                } else if (!isGlobalTlFinished) {
                    isGlobalTlFinished = true;

                    t == ratio && globalTl.progress(1);
                    globalIntroEndCallback && globalIntroEndCallback(node);
                }
                tl.progress(t);
                if (t == 1) {
                    introEndCallback && introEndCallback(node);
                }
            };
        } else if (globalTl.duration() > tl.duration()) {
            const ratio = tl.duration() / globalTl.duration();

            theDuration = globalTl.duration() * 1000;
            theTick = (t) => {
                if (!hasStarted && t !== 0) {
                    hasStarted = true;

                    introStartCallback && introStartCallback(node);
                    globalIntroStartCallback && globalIntroStartCallback(node);
                }
                if (t < ratio) {
                    tl.progress(t / ratio);
                } else if (!isTlFinished) {
                    isTlFinished = true;

                    t == ratio && tl.progress(1);
                    introEndCallback && introEndCallback(node);
                }
                globalTl.progress(t);
                if (t == 1) {
                    globalIntroEndCallback && globalIntroEndCallback(node);
                }
            };
        } else {
            theDuration = tl.duration() * 1000;
            theTick = (t) => {
                if (!hasStarted && t !== 0) {
                    hasStarted = true;

                    introStartCallback && introStartCallback(node);
                    globalIntroStartCallback && globalIntroStartCallback(node);
                }
                tl.progress(t);
                globalTl.progress(t);
                if (t == 1) {
                    introEndCallback && introEndCallback(node);
                    globalIntroEndCallback && globalIntroEndCallback(node);
                }
            };
        }

        return {
            delay,
            duration: theDuration,
            tick: theTick,
        };
    };
    const outro = (node: HTMLElement, _config: {}) => {
        const { tick = () => null, duration = 0, timeline } = outroConfig ?? { };
        const { tick: globalTick = () => null, duration: globalDuration, timeline: globalTimeline } = globalOutroConfig ?? { };

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

        let hasStarted = false;
        let isGlobalTlFinished = false;
        let isTlFinished = false;

        // Calculate animation duration and tick logic
        if (tl.duration() > globalTl.duration()) {
            const ratio = globalTl.duration() / tl.duration();

            theDuration = tl.duration() * 1000;
            theTick = (_, t) => {
                if (!hasStarted && t !== 0) {
                    hasStarted = true;

                    outroStartCallback && outroStartCallback(node);
                    globalOutroStartCallback && globalOutroStartCallback(node);
                }
                if (t < ratio) {
                    globalTl.progress(t / ratio);
                } else if (!isGlobalTlFinished) {
                    isGlobalTlFinished = true;

                    t == ratio && globalTl.progress(1);
                    globalOutroEndCallback && globalOutroEndCallback(node);
                }
                tl.progress(t);
                if (t == 1) {
                    outroEndCallback && outroEndCallback(node);
                }
            };
        } else if (globalTl.duration() > tl.duration()) {
            const ratio = tl.duration() / globalTl.duration();

            theDuration = globalTl.duration() * 1000;
            theTick = (_, t) => {
                if (!hasStarted && t !== 0) {
                    hasStarted = true;

                    outroStartCallback && outroStartCallback(node);
                    globalOutroStartCallback && globalOutroStartCallback(node);
                }
                if (t < ratio) {
                    tl.progress(t / ratio);
                } else if (!isTlFinished) {
                    isTlFinished = true;

                    t == ratio && tl.progress(1);
                    outroEndCallback && outroEndCallback(node);
                }
                globalTl.progress(t);
                if (t == 1) {
                    globalOutroEndCallback && globalOutroEndCallback(node);
                }
            };
        } else {
            theDuration = tl.duration() * 1000;
            theTick = (_, t) => {
                if (!hasStarted && t !== 0) {
                    hasStarted = true;

                    outroStartCallback && outroStartCallback(node);
                    globalOutroStartCallback && globalOutroStartCallback(node);
                }
                tl.progress(t);
                globalTl.progress(t);
                if (t == 1) {
                    outroEndCallback && outroEndCallback(node);
                    globalOutroEndCallback && globalOutroEndCallback(node);
                }
            };
        }

        lastOutroDuration.set(theDuration);

        return {
            duration: theDuration,
            tick: theTick,
        };
    };
</script>

<div class="transition-wrapper" in:intro out:outro use:initAction>
    <slot />
</div>
