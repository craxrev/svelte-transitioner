<script>
    import { onEnter, onLeave } from "$lib/transitioner";
    import Transition from "$lib/Components/Transition.svelte";

    onEnter(() => {
        console.log('in:', '/num/three');
    }, 1000, '/num/three');

    onLeave(() => {
        console.log('out:', '/num/three');
    }, 1000, '/num/three');
</script>

<Transition>
    3333
    <a href="/">index.svelte</a>
    <a href="/num/one">one.svelte</a>
    <a href="/num/two">two.svelte</a>
    <a href="/num/three">three.svelte</a>
</Transition>
