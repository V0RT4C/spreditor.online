import JSZip from 'jszip';
import UPNG from '@pdf-lib/upng';

const worker = self as any;

worker.onmessage = async function(event : any){
    const sprites : { _id: number, _rgbaArray: Uint8Array }[] = event.data.sprites;

    const zip = new JSZip();
    worker.postMessage({ type: 'update', progressPercent: 0, msg: 'Starting to generate ZIP file.' });

    for (let i=0; i < sprites.length; i++){
        zip.file(`${sprites[i]._id}.png`, UPNG.encode([sprites[i]._rgbaArray], 32, 32, 0));
        worker.postMessage({ type: 'update', progressPercent: ((i / sprites.length) * 100), msg: `Added ${i+1}/${sprites.length} sprites to ZIP file.`});
    }

    worker.postMessage({type: 'update', progressPercent: 100, msg: 'Completed adding sprites to the ZIP file. Now finishing up...' });
    const blob = await zip.generateAsync({ type: 'blob' });
    worker.postMessage({ type: 'update', progressPercent: 100, msg: `Done! You should now get a prompt to download the ZIP file.` });
    worker.postMessage({ type: 'data', msg: blob });
}

export default worker;