<script>
    import { onEnter, onLeave } from "$lib/transitioner";
    import Transition from "$lib/Components/Transition.svelte";

    onEnter(() => {
        console.log('in:', '/num/one');
    }, null, '/num/one');

    onLeave(() => {
        console.log('out:', '/num/one');
    }, 1000, '/num/one');
</script>

<Transition>
    1111
    <a href="/">index.svelte</a>
    <a href="/num/one">one.svelte</a>
    <a href="/num/two">two.svelte</a>
    <a href="/num/three">three.svelte</a>
</Transition>
