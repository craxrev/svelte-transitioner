<script>
    import { onMount, setContext } from 'svelte';
    import { page } from '$app/stores';
    import { navigating } from '$app/stores';

    import { init as initTransitioner, onGlobalEnter, onGlobalLeave } from '$lib/transitioner';

    initTransitioner();

    const animateIn = (node) => {

    };

    onGlobalEnter(() => {
        console.log('global in!');
    });
    onGlobalLeave(animateIn, true);
</script>

<slot />
