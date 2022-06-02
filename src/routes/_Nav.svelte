<nav class="w-full h-12 bg-primary border-b border-solid border-primary">
	<div class="container mx-auto grid grid-cols-2">
		<div class="flex justify-start">
			{#if hasLoadedSprites}
				<div on:click={() => dispatch('drawer')} class="lg:hidden w-16 flex flex-col justify-center items-center px-2 border-r border-solid border-primary cursor-pointer">
					<i class="block bx bx-menu text-accent text-2xl font-bold"></i>
				</div>
			{/if}
			<div class="px-4 h-12 flex items-center" style="font-family: 'neutral_facebold';">
				<h1 class="inline-block bold text-base">SPR<span class="text-accent">EDITOR</span></h1>
				<span class="hidden sm:block text-[0.6rem] relative top-[5px] font-bold ml-2">V. 1.0.0</span>
			</div>
		</div>
		{#if hasLoadedSprites}
			<div class="flex justify-end">
				<div on:click={() => dispatch('extract')} class="w-16 flex flex-col justify-center items-center bg-secondary px-2 border-t border-l border-solid border-primary cursor-pointer">
					<i class="block icon ots-file-zip text-accent text-base font-bold"></i>
					<span style="font-size: 0.5rem" class="mt-1">Extract</span>
				</div>
				<div on:click={() => dispatch('compile')} class="w-16 flex flex-col justify-center items-center bg-secondary px-2 border-t border-r border-l border-solid border-primary cursor-pointer">
					<i class="block icon ots-compile text-accent text-base font-bold"></i>
					<span style="font-size: 0.5rem" class="mt-1">Compile</span>
				</div>
				<div on:click={() => dispatch('closeFile')} class="w-16 flex flex-col justify-center items-center bg-secondary px-2 border-t border-r border-l border-solid border-primary cursor-pointer">
					<span class="block text-base text-red-400">X</span>
					<span style="font-size: 0.5rem">Close</span>
				</div>
			</div>
		{:else}
			<div class="flex justify-end">
				<div on:click={() => dispatch('import')} class="w-16 flex flex-col justify-center items-center bg-secondary px-2 border-t border-l border-solid border-primary cursor-pointer">
					<i class="block icon ots-import text-accent text-base font-bold"></i>
					<span style="font-size: 0.5rem" class="mt-1">Import</span>
				</div>
				<div on:click={() => dispatch('new')} class="w-16 flex flex-col justify-center items-center bg-secondary px-2 border-t border-r border-l border-solid border-primary cursor-pointer">
					<i class="block bx bxs-file-blank text-accent text-base font-bold"></i>
					<span style="font-size: 0.5rem">New</span>
				</div>
			</div>
		{/if}
	</div>
</nav>

<script lang="ts">
import * as sprEditorStore from './sprEditor.store';
import type { SpriteEditorStore } from './sprEditor.store';
import { createEventDispatcher, onDestroy } from 'svelte';

let hasLoadedSprites : boolean = false;

const dispatch = createEventDispatcher();

const unsub = sprEditorStore.subscribe((store : SpriteEditorStore) => {
    hasLoadedSprites = store.hasLoadedSprites;
});

onDestroy(() => {
	unsub();
})
</script>