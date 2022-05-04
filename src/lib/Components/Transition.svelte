<script>
    import { getContext, setContext } from "svelte";
    import { get } from "svelte/store";
    import { fly } from "svelte/transition";

    import { lastLeaveDuration } from '$lib/transitioner';

    const initCallback = getContext('initCallback');
    const enterConfig = getContext('enterConfig');
    const leaveConfig = getContext('leaveConfig');

    const initAction = (node) => {
        initCallback && initCallback(node);
    };
    const enter = (node) => {
        const { callback = () => null, duration = 0 } = enterConfig ?? {};

        const { css } = fly(node, duration);

        return {
            duration,
            delay: get(lastLeaveDuration) ?? 0,
            tick: (t) => callback(node, t),
            css
        }
    };
    const leave = (node) => {
        const { callback = () => null, duration = 0 } = leaveConfig ?? {};

        lastLeaveDuration.set(duration);

        const { css } = fly(node, duration);

        return {
            duration,
            tick: (t) => callback(node, t),
            css,
        }
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