{#if show}
<div 
    transition:mfade={{ delay: 300, duration: 200 }}
    on:click={onClose}
    class={`fixed w-full h-screen flex justify-center items-center top-0 z-30 bg-black bg-opacity-40`}>
</div>
<div 
    in:fly={{ delay: 200, y: -164 }}
    out:fly={{ delay: 0, y: -164 }}
    class="border border-solid border-primary bg-secondary rounded-lg fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40">
    <slot />
</div>
{/if}

<script lang="ts">
import { createEventDispatcher } from 'svelte';
import { fly } from 'svelte/transition';
export let show : boolean = false;

const dispatch = createEventDispatcher();

$: if (show === false){
        dispatch('close');
    }
    else{
        dispatch('open');
    }

const onClose = () => {
    show = false;
}

function mfade(node : any, { delay = 0, duration = 200 }) {
	return {
		delay,
		duration,
		css: (t : any) => `opacity: ${t}`,
	};
}
</script>
