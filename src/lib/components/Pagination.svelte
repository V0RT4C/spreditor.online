<div class="flex justify-center gap-4 items-center h-4">
    {#if mobile}
        <button on:click={() => dispatch('first')} class="inline-flex items-center text-xs font-medium rounded-r text-accent">
            <svg class="mr-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd"></path></svg>
            First
        </button>
    {/if}
    {#if showingStart > 1 && !mobile}
        <button on:click={() => dispatch('prev')} class="inline-flex items-center text-xs font-medium rounded-l text-accent">
            <svg class="mr-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd"></path></svg>
            Prev
        </button>
    {/if}
    <span class="text-xs text-secondary">
        Showing 
        <span class="font-semibold text-white">{showingStart}</span> to <span class="font-semibold text-white">{showingEnd}</span> of <span class="font-semibold text-white">{totalCount}</span>
    </span>
    {#if showingEnd < totalCount && !mobile}
        <button on:click={() => dispatch('next')} class="inline-flex items-center text-xs font-medium rounded-r text-accent">
            Next
            <svg class="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </button>
    {/if}
    {#if mobile}
        <button on:click={() => dispatch('last')} class="inline-flex items-center text-xs font-medium rounded-r text-accent">
            Last
            <svg class="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </button>
    {/if}
</div>

<script lang="ts">
import { createEventDispatcher } from 'svelte';
export let showingStart : number;
export let showingEnd : number;
export let totalCount : number;
export let mobile : boolean = false;

const dispatch = createEventDispatcher();
</script>
    