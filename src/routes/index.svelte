<script>
    import { onInit, intro, outro } from "$lib/transitioner";
    import Transitioner from "$lib/Transitioner.svelte";

    onInit((node) => {
        console.log('init:', '/', node);
    });
    intro(() => {
        console.log('in:', '/');
    }, 1000);
    outro(() => {
        console.log('out:', '/');
    }, 3000);

</script>

<Transitioner>
    <a href="/num/one">one.svelte</a>
    <a href="/num/two">two.svelte</a>
    <a href="/num/three">three.svelte</a>
</Transitioner>
