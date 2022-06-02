export const detectSwipe = (node : HTMLElement, callback : Function) => {
    let touchstartX = 0;
    let touchendX = 0;

    node.addEventListener('touchstart', function(event : TouchEvent) {
        touchstartX = event.changedTouches[0].screenX;
    }, false);

    node.addEventListener('touchend', function(event : TouchEvent) {
        touchendX = event.changedTouches[0].screenX;
        handleSwipe();
    }, false); 

    function handleSwipe() {
        if ((touchstartX - touchendX) > 70) {
            callback('left');
        }
        if ((touchendX - touchstartX) > 70) {
            callback('right');
        }
    }
}
