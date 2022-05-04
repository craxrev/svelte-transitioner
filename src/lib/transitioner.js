import { getContext, onMount, setContext } from 'svelte';
import { beforeNavigate, afterNavigate } from '$app/navigation';
import { navigating as _navigating } from '$app/stores';

import { derived, get, writable } from "svelte/store";
import { debounce, unbounce } from './utils';

export const navigating = writable(null);

export const init = () => {
    _navigating.subscribe((value) => {
        navigating.set(!!value);
    });
    beforeNavigate(() => {
        // console.log('beforeNavigate');
    });
    
    afterNavigate(() => {
        // console.log('afterNavigate');
    });
}

// TODO: rename to hooks
const debounceHelper = debounce();
const unbounceHelper = unbounce();

export const onEnter = (callback, delay, path) => {
    let isCalled = false;
    afterNavigate(({ from, to }) => {
        console.log('navigating:', get(navigating));
        // console.log(path, '<=:', from?.pathname, to?.pathname);
        // console.log('navigating:', navigating, path);
        if (!isCalled) {
            isCalled = true;
            debounceHelper(callback, 1000);
        }
    });

    // beforeNavigate(({ from, to }) => {
    //     if (from?.pathname === to?.pathname) {
    //         debounceHelper(callback, 1000);
    //         // isCalled = true;
    //     }
    // });

    // afterNavigate(({ from, to }) => {
    //     if (from) {
    //         if (from?.pathname === to?.pathname) {
    //             debounceHelper(callback, 1000);
    //         } else if (!isCalled) {
    //             debounceHelper(callback, 1000);
    //             isCalled = true;
    //         }
    //     }
    // });
};
export const onLeave = (callback, delay, path) => {
    let isCalled = false;
    beforeNavigate(({ from, to }) => {
        // console.log(path, '=>', from?.pathname, to?.pathname);
        if (!isCalled) {
            isCalled = true;
            unbounceHelper(callback, 1000);
        }
    });
};

