<script>
    import { onInit, onEnter, onLeave } from "$lib/transitioner";
    import Transitioner from "$lib/Components/Transitioner.svelte";

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

<Transitioner>
    1111
    <a href="/">index.svelte</a>
    <a href="/num/one">one.svelte</a>
    <a href="/num/two">two.svelte</a>
    <a href="/num/three">three.svelte</a>
</Transitioner>
