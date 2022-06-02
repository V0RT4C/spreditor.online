<div class="relative">
    <div 
    on:click={() => showOptions = !showOptions}
    use:clickOutside={() => showOptions = false}
    class={` 
        px-2
        sm:px-4
        py-2
        text-white 
        text-xs 
        text-left
        bg-primary 
        rounded-md  
        focus:outline-none 
        focus:bg-white 
        focus:text-gray-900 
        border 
        border-solid 
        border-primary
        relative
        cursor-pointer
        select-none
        truncate
        `}
        >
        <span>{selectedOption.name}</span>
        <span class="absolute top-1/2 -translate-y-[44%] right-2 m-auto flex flex-col items-center">
            <i class="bx bx-chevron-up relative top-[2px]" />
            <i class="bx bx-chevron-down relative bottom-[2px]" />
        </span>
    </div>
    {#if showOptions}
        <div 
        in:fly={{ y: -20, duration: 100 }}
        class={` 
        absolute
        top-[40px]
        w-full
        text-xs
        bg-primary
        border
        border-solid
        border-primary
        rounded-md
        max-h-32
        overflow-auto
        select-none
        `}>
            <ul>
                {#each options as option, i}
                    <li 
                    on:click={(e) => onOptionSelect(option)}
                    class={`
                        py-2
                        px-4 
                        transition-color
                        duration-200
                        hover:bg-accent
                        cursor-pointer
                        ${i === 0 ? 'rounded-t-md' : ''}
                        ${i === options.length - 1 ? 'rounded-b-md' : ''}
                    `}>
                        {option.name}
                    </li>
                {/each}
            </ul>
        </div>
    {/if}
</div>

<script lang="ts">
import { createEventDispatcher } from 'svelte';
import { fly } from 'svelte/transition';
let showOptions : boolean = false;
export let selectedOption : { name: string, value : string | number };
export let options : { name: string, value: string | number }[] = [];

const dispatch = createEventDispatcher();

function clickOutside(element : any, callbackFunction : any) {
    function onClick(event : any) {
        if (!element.contains(event.target)) {
            callbackFunction();
        }
    }
    
    document.body.addEventListener('click', onClick);
    
    return {
        update(newCallbackFunction : any) {
            callbackFunction = newCallbackFunction;
        },
        destroy() {
            document.body.removeEventListener('click', onClick);
        }
    }
}

const onOptionSelect = (option : { name: string, value: string | number }) => {
    selectedOption = option;
    dispatch('change', selectedOption);
}
</script>