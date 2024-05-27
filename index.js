const shakaSdk = 'https://cdn.jsdelivr.net/npm/shaka-player@4.7.11/dist/shaka-player.compiled.min.js'
const manifestUri =
    'https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd';


const script = document.createElement('script');
script.src = shakaSdk;

document.head.appendChild(script);

export const getManifest = () => manifestUri;
