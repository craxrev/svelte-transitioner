<script>
    import { onMount, setContext } from 'svelte';
    import { page } from '$app/stores';
    import { navigating } from '$app/stores';

    import { init as initTransitioner, onEnter, onLeave } from '$lib/transitioner';

    initTransitioner();
</script>

<slot />
