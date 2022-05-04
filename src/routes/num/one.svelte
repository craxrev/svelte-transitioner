<script>
    import { onInit, onEnter, onLeave } from "$lib/transitioner";
    import Transition from "$lib/Components/Transition.svelte";

    const animateInHero = (node) => {

    };
    const animateOutHero = (node) => {

    };

    onInit((node) => {
        console.log('init:', '/num/one', node);
    });
    onEnter(animateInHero);
    onLeave(animateOutHero);
</script>

<Transition>
    1111
    <a href="/">index.svelte</a>
    <a href="/num/one">one.svelte</a>
    <a href="/num/two">two.svelte</a>
    <a href="/num/three">three.svelte</a>
</Transition>
