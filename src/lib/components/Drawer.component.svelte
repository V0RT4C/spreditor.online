{#if show}
    <div 
    transition:fly={{ x: -400, duration: 400 }}
    class="absolute w-full h-screen bg-secondary z-50 select-none"
    >
        <div on:click={() => dispatch('close')} class="p-4 flex justify-center items-center border border-solid border-primary hover:bg-primary transition-color duration-200 cursor-pointer">
            <span class="text-lg text-accent font-bold rounded-full border-2 border-solid border-accent px-4 py-2">X</span>
        </div>
        <slot></slot>
    </div>
{/if}

<script lang="ts">
import { browser } from '$app/env'; 
import { fly } from "svelte/transition";
import { createEventDispatcher } from "svelte";

export let show: boolean = false;
const dispatch = createEventDispatcher();

$: if (show) {
    if (browser){
        document.body.classList.add("overflow-hidden");
        document.body.classList.add("sm:overflow-auto");
        (document as any).querySelector("meta[name=viewport]")
            .setAttribute(
                "content",
                "width=device-width,minimum-scale=1,maximum-scale=1"
            );
    }
} else {
    if (browser){
        document.body.classList.remove("overflow-hidden");
        document.body.classList.remove("sm:overflow-auto");
    }
}


// function mfade(node : any, { delay = 0, duration = 200 }) {
// 	return {
// 		delay,
// 		duration,
// 		css: (t : any) => `opacity: ${t}`,
// 	};
// }

// function mResize(node : any, { delay = 0, duration = 100 }) {
// 	return {
// 		delay,
// 		duration,
// 		css: (t : any) => `width: ${t}`,
// 	};
// }

</script>

<style>
</style>