<div 
on:click={onGoToTop}
style="bottom: 1rem; right: 1rem;"
class="fixed bg-primary border border-solid border-primary rounded-lg h-12 w-12 flex justify-center items-center cursor-pointer">
    <i class="bx bx-up-arrow text-accent"></i>
</div>

<script lang="ts">
const onGoToTop = () => {
    if (window){
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    else if(document){
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }
}
</script>