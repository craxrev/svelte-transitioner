<script>
    import { onInit, onEnter, onLeave, Transitioner } from "$lib";

    onInit((node) => {
        console.log('init:', '/', node);
    });
    onEnter(() => {
        console.log('in:', '/');
    }, 1000);
    onLeave(() => {
        console.log('out:', '/');
    }, 3000);

</script>

<Transitioner>
    <a href="/num/one">one.svelte</a>
    <a href="/num/two">two.svelte</a>
    <a href="/num/three">three.svelte</a>
</Transitioner>
