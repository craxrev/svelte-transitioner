<script>
    import { onEnter, onLeave } from "$lib/transitioner";
    import Transition from "$lib/Components/Transition.svelte";
    import { debounce, unbounce } from '$lib/utils';

    onEnter(() => {
        console.log('in:', '/');
    }, null, '/');

    onLeave(() => {
        console.log('out:', '/');
    }, 1000, '/');

    let a = 0;

    const debounceHelper = debounce();
    const unbounceHelper = unbounce();

    const click1 = () => debounceHelper(() => (a++), 1000);
    const click2 = () => unbounceHelper(() => (a++), 1000);
</script>

<Transition>
    <a href="/num/one">one.svelte</a>
    <a href="/num/two">two.svelte</a>
    <a href="/num/three">three.svelte</a>
    <pre>
        a: {a}
    </pre>
    <button on:click={click1}>debounce</button>
    <button on:click={click2}>unbounce</button>
</Transition>
