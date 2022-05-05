<script>
    import { gsap } from 'gsap';

    import { onInit, onEnter, onLeave, Transitioner } from "$lib";

    onInit((node) => {
        gsap.set(node, {
            opacity: 0,
        });
    });
    onEnter((node) => {
        const tl = gsap.timeline({
            paused: true
        });

        tl.set(node, {
            opacity: 1
        }).from(node, {
            duration: 1,
            yPercent: -100,
        });

        return tl;
    });
    onLeave((node) => {
        const tl = gsap.timeline({
            paused: true
        });

        tl.to(node, {
            duration: 1,
            yPercent: -100,
        });

        return tl;
    });
</script>

<Transitioner>
    1111
    <a href="/">index.svelte</a>
    <a href="/num/one">one.svelte</a>
    <a href="/num/two">two.svelte</a>
    <a href="/num/three">three.svelte</a>
</Transitioner>
