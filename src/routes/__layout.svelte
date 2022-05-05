<script>
    import { init as initTransitioner, onGlobalEnter, onGlobalLeave, TransitionLayout } from '$lib';

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
