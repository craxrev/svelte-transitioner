<script>
    import { onInit, onEnter, onLeave } from "$lib/transitioner";
    import Transition from "$lib/Components/Transition.svelte";

    onInit((node) => {
        console.log('init:', '/', node);
    });
    onEnter(() => {
        console.log('in:', '/');
    }, 1000, '/');
    onLeave(() => {
        console.log('out:', '/');
    }, 3000, '/');

</script>

<Transition>
    <a href="/num/one">one.svelte</a>
    <a href="/num/two">two.svelte</a>
    <a href="/num/three">three.svelte</a>
</Transition>
