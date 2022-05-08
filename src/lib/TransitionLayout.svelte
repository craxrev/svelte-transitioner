<div class="transitions-stack">
    <slot />
</div>

<style>
    .transitions-stack {
        display: grid;
    }
    .transitions-stack > :global(.transition-wrapper) {
        grid-column: 1/2;
        grid-row: 1/2;
    }
    .transitions-stack > :global(.transition-wrapper:nth-last-of-type(1)) {
        z-index: 0;
    }
    .transitions-stack > :global(.transition-wrapper:nth-last-of-type(2)) {
        z-index: 1;
    }
</style>
