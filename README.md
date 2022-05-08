# svelte-transitioner

# Overview
A Svele/SvelteKit plugin that adds new hooks for customizing mount / unmount transitions.


# Installation
```
yarn add svelte-transitioner
```


# Description
- Customize your own transitions with ease using custom hooks
- Compatible with GSAP timelines
- Synchromous transitions, no overlapping between previous **Out** with the current **In** transition


# Usage
This plugin adds the following hooks:
- `onGlobalInit`: a hook responsible for executing custom code when mounting any of the child components
- `onInit`: a hook responsible for executing custom code on the current component
- `onGlobalEnter`: a hook that can execute the same custom transition when mounting any of the child components
- `onEnter`: a hook that can execute a transition when mounting a component
- `onGlobalLeave`: a hook that can execute the same custom transition when unmounting any of the child components
- `onLeave`: a hook that can execute a transition when unmounting a component

for the `on*Init` hooks, they will be called like the following:
```Javascript
onInit((node) => {
    // node is the current mounted node
})
```
as for the `on*Enter` or `on*Leave`, it can be called in two ways:
```Javascript
onEnter((node, t) => {
    // node is the current mounted node
    // t is the current transition animation
    // 1000 is the duration of the transition
}, 1000)

// Or you can use a GSAP Timeline callback instead, like the following
onGlobalEnter((node) => {
    const tl = gsap.timeline({
        paused: true
    })

    tl.to(node, {
        duration: 1,
        yPercent: -100,
    })

    return tl
})
```

One thing to keep in mind, in order for all the above hooks to work, we have to use some wrapper components:
- `TransitionLayout`: this should be used in the parent components that will contains all the transitioned components.
- `Transitioner`: this should be wrapped around the components that you want to apply transitions to.

So for example in a SvelteKit project, we can have the following:

`/routes/__layout.svelte`:
```Svelte
<script>
    import { onGlobalInit, onGlobalEnter, onGlobalLeave, TransitionLayout } from 'svelte-transitioner'

    onGlobalInit((node) => {

    })
    onGlobalEnter((node) => {
        return gsap.timeline({ paused: true })
    })
    onGlobalLeave((node, t) => {

    })
</script>
<TransitionLayout>
    <slot />
</TransitionLayout>
```
`/routes/index.svelte`:
```Svelte
<script>
    import { onInit, onEnter, onLeave, Transitioner } from 'svelte-transitioner'

    onInit((node) => {

    })
    onEnter((node) => {
        return gsap.timeline({ paused: true })
    })
    onLeave((node, t) => {

    })
</script>
<Transitioner>
    index
    <a href="/one">one.svelte</a>
</Transitioner>
```
`/routes/one.svelte`:
```Svelte
<script>
    import { onInit, onEnter, onLeave, Transitioner } from 'svelte-transitioner'

    onInit((node) => {

    })
    onEnter((node) => {
        return gsap.timeline({ paused: true })
    })
    onLeave((node, t) => {

    })
</script>
<Transitioner>
    One
    <a href="/">index.svelte</a>
</Transitioner>
```

### TODO:
- re-work repo examples
- optimise
- add some tests
