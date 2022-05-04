<script>
    const wait = (_) => {
        return {
            duration: 2000,
        }
    };
</script>

<!-- <div class="transition" /> -->
<div class="transition-wrapper" out:wait|local>
    <slot />
</div>

<style>
    .transition {
        position: fixed;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        background-color: aqua;
        opacity: 0.5;
        pointer-events: none;
    }
</style>