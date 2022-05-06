<script>
    import { init as initTransitioner, onGlobalEnter, onGlobalLeave } from '$lib/transitioner';
    import TransitionLayout from '$lib/TransitionLayout.svelte';

    initTransitioner();

    // onGlobalEnter(() => {
    //     console.log('global in!');
    // });
    // onGlobalLeave(() => {
    //     console.log('global out!');
    // });
</script>

<TransitionLayout>
    <slot />
</TransitionLayout>
