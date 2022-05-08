<script>
    import { gsap } from 'gsap';
    
    import { onInit, onIntroStart, onOutroStart, onIntroEnd, onOutroEnd, intro, outro } from "$lib/transitioner";
    import Transitioner from '$lib/Transitioner.svelte';

    onInit((node) => {
        gsap.set(node, {
            opacity: 0,
        });
    });
    onIntroStart(() => {
        console.log('Component intro started');
    });
    onOutroStart(() => {
        console.log('Component outro started');
    });
    onIntroEnd(() => {
        console.log('Component intro ended');
    });
    onOutroEnd(() => {
        console.log('Component outro eded');
    });

    intro((node) => {
        const tl = gsap.timeline({
            paused: true
        });

        tl.set(node, {
            opacity: 1
        }).from(node, {
            duration: 5,
            yPercent: -100,
        });

        return tl;
    });
    outro((node) => {
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
