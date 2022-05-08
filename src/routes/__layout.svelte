<script>
    import { gsap } from 'gsap';

    import { onGlobalInit, onGlobalIntroStart, onGlobalOutroStart, onGlobalIntroEnd, onGlobalOutroEnd, globalIntro, globalOutro } from '$lib/transitioner';
    import TransitionLayout from '$lib/TransitionLayout.svelte';

    onGlobalInit(() => {
        console.log('global init!');
    });
    onGlobalIntroStart(() => {
        console.log('Global intro started');
    });
    onGlobalOutroStart(() => {
        console.log('Global outro started');
    });
    onGlobalIntroEnd(() => {
        console.log('Global intro ended');
    });
    onGlobalOutroEnd(() => {
        console.log('Global outro ended');
    });

    globalIntro(() => {
        const h1 = document.querySelector('h1');
        const tl = gsap.timeline({
            paused: true
        });

        tl.set(h1, {
            rotation: 0,
            immediateRender: false,
        }).from(h1, {
            duration: 1,
            rotation: -45,
        });

        return tl;
    });
    globalOutro(() => {
        const h1 = document.querySelector('h1');
        const tl = gsap.timeline({
            paused: true
        });

        tl.set(h1, {
            rotation: 0,
            immediateRender: false,
        }).to(h1, {
            duration: 1,
            rotation: -45,
        });

        return tl;
    });
</script>

<TransitionLayout>
    <h1>Transition</h1>
    <slot />
</TransitionLayout>
