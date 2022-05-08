<script>
    import { gsap } from 'gsap';

    import { onGlobalInit, onGlobalEnter, onGlobalLeave } from '$lib/transitioner';
    import TransitionLayout from '$lib/TransitionLayout.svelte';

    onGlobalInit(() => {
        console.log('global init!');
    });

    onGlobalEnter(() => {
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
    onGlobalLeave(() => {
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
