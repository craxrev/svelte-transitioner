<div>
    <slot />
</div>

<style>
    div {
        display: grid;
    }
    div > :global(div) {
        grid-column: 1/2;
        grid-row: 1/2;
    }
</style>
