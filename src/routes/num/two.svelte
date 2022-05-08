<script lang="ts">
    import { gsap } from 'gsap';

    import { onInit, intro, outro } from "$lib/transitioner";
    import Transitioner from '$lib/Transitioner.svelte';

    onInit((node: HTMLElement) => {
        gsap.set(node, {
            opacity: 0,
        });
    });
    intro((node: HTMLElement) => {
        const tl = gsap.timeline({
            paused: true
        });

        tl.set(node, {
            opacity: 1
        }).from(node, {
            duration: 1,
            xPercent: -100,
        });

        return tl;
    });
    outro((node: HTMLElement) => {
        const tl = gsap.timeline({
            paused: true
        });

        tl.to(node, {
            duration: 1,
            xPercent: -100,
        });

        return tl;
    });
</script>

<Transitioner>
    2222
    <a href="/">index.svelte</a>
    <a href="/num/one">one.svelte</a>
    <a href="/num/two">two.svelte</a>
    <a href="/num/three">three.svelte</a>
</Transitioner>
