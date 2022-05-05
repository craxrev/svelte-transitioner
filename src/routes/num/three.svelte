<script>
    import { onEnter, onLeave } from "$lib/transitioner";
    import Transitioner from "$lib/Components/Transitioner.svelte";

    onEnter(() => {
        console.log('in:', '/num/three');
    }, 1000, '/num/three');

    onLeave(() => {
        console.log('out:', '/num/three');
    }, 1000, '/num/three');
</script>

<Transitioner>
    3333
    <a href="/">index.svelte</a>
    <a href="/num/one">one.svelte</a>
    <a href="/num/two">two.svelte</a>
    <a href="/num/three">three.svelte</a>
</Transitioner>
