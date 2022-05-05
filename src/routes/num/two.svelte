<script>
    import { onEnter, onLeave } from "$lib/transitioner";
    import Transitioner from "$lib/Components/Transitioner.svelte";

    onEnter(() => {
        console.log('in:', '/num/two');
    }, 1000, '/num/two');

    onLeave(() => {
        console.log('out:', '/num/two');
    }, 1000, '/num/two');
</script>

<Transitioner>
    2222
    <a href="/">index.svelte</a>
    <a href="/num/one">one.svelte</a>
    <a href="/num/two">two.svelte</a>
    <a href="/num/three">three.svelte</a>
</Transitioner>
