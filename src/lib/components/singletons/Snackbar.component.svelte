<div
	class:top-0={position === 'top-left' || position === 'top-right'}
	class:right-0={position === 'top-right' || position === 'bottom-right'}
	class:bottom-0={position === 'bottom-right' || position === 'bottom-left'}
	class:left-0={position === 'top-left' || position === 'bottom-left'}
	class="fixed p-4 flex flex-col z-10 w-full sm:w-auto"
>
	{#each list as item (item.id)}
		<span
			in:fly={{ y: 20 }}
			out:fly={{ x: 200 }}
			animate:flip={{ duration: 100 }}
			on:click={sbs.removeSnackbar(item.id)}
			class={`
			${item.color ? item.color : 'bg-accent'}
			${item.textColor ? item.textColor : 'text-[#1e273a]'}
			flex 
			justify-center 
			items-center 
			w-auto 
			h-12 
			p-4 
			mt-4 
			rounded-md 
			shadow-2xl 
			font-bold 
			text-xs 
			md:text-sm 
			select-none 
			whitespace-no-wrap`
			}
			style="min-width: 200px;"
		>
			{#if item.icon}<i class={item.icon} />{/if}
			<span class:ml-4={item.icon}>{item.message}</span>
		</span>
	{/each}
</div>

<script lang="ts">
import { onDestroy } from "svelte";
import { flip } from "svelte/animate";
import { fly } from "svelte/transition";
import * as sbs from "../../../store/Snackbar.store";
export let position: string = "bottom-right";

let list: any = [];

let unsub = sbs.subscribe((store : any) => {
	list = store.list;
});

onDestroy(() => {
	unsub();
});
</script>

<style>
.text-default {
	color: #cbd5e0;
}
</style>