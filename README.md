## Tibia .SPR viewer/editor/extractor

This is a .SPR viewer/editor/extractor for Tibia versions 3.0 -> 10.56.
It is a web based app written in TypeScript with Svelte using Sveltekit.
You can find a hosted version of this app at https://spreditor.online

This is how it looks after a Tibia .SPR file has been loaded:
![Alt text](src/assets/spr_editor_example.webp?raw=true "Screenshot")

### Functionality
- Creating new .SPR files
- Adding 32x32 .PNG images to the .SPR project
- Editing existing sprites
- Erasing existing sprites
- Compiling
- Extracting all sprites as .PNG files. The app will create a .ZIP archive for you to download.

### Installing / running app
To run this app you need to have NodeJS installed. Please use NodeJS 16.16 LTS or above.

1. Clone the repo
2. cd into the directory
3. npm install
4. npm run dev

Then open your browser and go to http://127.0.0.1:3000

If you want to build this app you run ***npm run build*** instead.