export const convertRGBAToPNG = (sprite : Uint8Array, webworker : boolean = false) : string => {
    let canvas;
    if (webworker){
        //@ts-ignore
        canvas = new OffsceenCanvas();
    }else{
        canvas = document.createElement('canvas');
    }
    
    const ctx = canvas.getContext('2d');
    const clampedSpriteArray = Uint8ClampedArray.from(sprite);
    const imageData = new ImageData(clampedSpriteArray, 32, 32);
    canvas.width = imageData.width;
    canvas.height = imageData.height;
    ctx?.putImageData(imageData, 0, 0);
    const dataURI = canvas.toDataURL("image/png");
    canvas.remove();
    return dataURI;
}