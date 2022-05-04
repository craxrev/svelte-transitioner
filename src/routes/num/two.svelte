<script>
    import { onEnter, onLeave } from "$lib/transitioner";
    import Transition from "$lib/Components/Transition.svelte";

    onEnter(() => {
        console.log('in:', '/num/two');
    }, null, '/num/two');

    onLeave(() => {
        console.log('out:', '/num/two');
    }, 1000, '/num/two');
</script>

<Transition>
    2222
    <a href="/">index.svelte</a>
    <a href="/num/one">one.svelte</a>
    <a href="/num/two">two.svelte</a>
    <a href="/num/three">three.svelte</a>
</Transition>
