const manifestUri = 'https://wrc-rallytv-a.akamaized.net/Content/channel/6a5d6131-aedf-f38a-651c-18273b6fe260/DASH/master.mpd?hdnts=st=1717136111~exp=1717136171~acl=/Content/channel/6a5d6131-aedf-f38a-651c-18273b6fe260/DASH/master.mpd*~hmac=7b8999adb7e5ad728d73b241479d4fda5a0708706657f700cc94ca8e2dc3fbea';
const licenseServer = 'https://widevine.entitlement.theplatform.eu/wv/web/ModularDrm/getRawWidevineLicense?schema=1.0&releasePid=5QINm1qDWgUp';
const authToken = 'Basic aHR0cDovL2FjY2Vzcy5hdXRoLnRoZXBsYXRmb3JtLmNvbS9kYXRhL0FjY291bnQvMjcwOTUyMDAyODpleUpoYkdjaU9pSlNVelV4TWlKOS5leUp6ZFdJaU9pSjNjbU53Y205a0xXRm5aSEl2TlRVd01UWTFOemd5SWl3aWFYTnpJam9pTVNJc0ltVjRjQ0k2TWpBek1qRTFNekUwT0N3aWFXRjBJam94TnpFMk56a3pNVFE0TkRJNExDSnFkR2tpT2lJek1XUXdZelZoWXkxaE5UVXpMVFExTjJVdE9URmhOaTFoWm1JeE5XRmhPVEJtT0RFaUxDSmthV1FpT2lKM2NtTndjbTlrTFdGblpISWlMQ0oxYm0waU9pSmhibWwwZEdFdWFtRnRaWE1yTXpkQVpHbGhaMjVoYkM1amIyMGlMQ0pqZEhnaU9pSjdYQ0pwWkZ3aU9sd2lOVFV3TVRZMU56Z3lYQ0lzWENKMWMyVnlUbUZ0WlZ3aU9sd2lZVzVwZEhSaExtcGhiV1Z6S3pNM1FHUnBZV2R1WVd3dVkyOXRYQ0lzWENKbGJXRnBiRndpT2x3aVhDSXNYQ0ptZFd4c1RtRnRaVndpT2x3aVhDSXNYQ0poZEhSeWFXSjFkR1Z6WENJNmUxd2lkWEp1T25Sb1pYQnNZWFJtYjNKdE9tTnZibk4xYldWeU9tRmpZMjkxYm5SY0lqcGNJbWgwZEhCek9pOHZZV05qYjNWdWRITXVZWFZrYVdWdVkyVXVkR2hsY0d4aGRHWnZjbTB1WlhVdllXTmpiM1Z1ZEhNdk1qY3dPVFV5TURBeU9DODRNbVUwTmpreU15MDJNREF3TFRRME16RXRPR05qTnkxa1pqTTBOVEkwWkRabE9UWmNJaXhjSW5WeWJqcDBhR1Z3YkdGMFptOXliVHBqYjI1emRXMWxjanBoWTJOdmRXNTBPbkJsY25OdmJtRmNJanBjSW1oMGRIQnpPaTh2WVdOamIzVnVkSE11WVhWa2FXVnVZMlV1ZEdobGNHeGhkR1p2Y20wdVpYVXZZV05qYjNWdWRITXZNamN3T1RVeU1EQXlPQzg0TW1VME5qa3lNeTAyTURBd0xUUTBNekV0T0dOak55MWtaak0wTlRJMFpEWmxPVFl2Y0dWeWMyOXVZWE12TVRoa05HTTVaV1l0T0RVeFpDMDBPV0pqTFdKaU9HTXRNVEprTWpSbFlqTTBZamswWENKOUxGd2liM2R1WlhKSlpGd2lPbHdpWENKOVhHNGlMQ0p2YVdRaU9pSXlOekE1TlRJd01ESTRJbjAuZXQzRWxuNEh6MmNGTUtEcXkwT1BNTEo0TF9UZ1pTT3cyMWRTTmdobnpYelpKRU9BM1IzR1lnSFUtcnpsODhZZWlMZ1RYRGtpZnRyU0FlYk96LXlOUTFCV0MtVXEtcFZ6MUFyY1lsd2hMOTlkam1NTG9JdnVBR052cHR6aExLQUhiRlBvREpZV2UzSUF2ZmRrYkhQTG9yMzlZMlNsSlNETUxBcHlDSlJpdGZGMkMzanlJYVVVb0dtLVQybkxTUmJTLWR4U3F2M2FVd29VNk1JRlpRT3NmNlNwY2tQN3BxS1lDOUhwaGFHZjlGZXV4MDhWY1B6VndNZVMzX0NydlVzWVB1OENrN01FaFRCZ2k1TlVFbENNMzFNRkc3bm5iVjhSYTFTTUNOWmZaUU9wbUxqWm9pcHkwTmtOZ3FQRElqWUVBeEVsalk1MENFZUZOMWlRRWg0Q3FR';

function initApp() {
    // Install built-in polyfills to patch browser incompatibilities.
    shaka.polyfill.installAll();

    // Check to see if the browser supports the basic APIs Shaka needs.
    if (shaka.Player.isBrowserSupported()) {
        // Everything looks good!
        initPlayer();
    } else {
        // This browser does not have the minimum set of APIs we need.
        console.error('Browser not supported!');
    }
}

async function initPlayer() {
    // Create a Player instance.
    const video = document.getElementById('video');
    const player = new shaka.Player();
    await player.attach(video);

    // Attach player to the window to make it easy to access in the JS console.
    window.player = player;
    window.video = video;

    // Listen for error events.
    player.addEventListener('error', onErrorEvent);
    player.configure({
        drm: {
          servers: { 'com.widevine.alpha': licenseServer }
        }
    });

    if (player?.getNetworkingEngine()?.registerRequestFilter) {
        //intercepting the every request from player and filtering.
        player.getNetworkingEngine().registerRequestFilter(function (type, request) {
            // check for the license request and replace the request header
            if (type === 2) {
                //update the authorization header with authToken
                request.headers['Authorization'] = authToken;
            }
        });
    }

    // Try to load a manifest.
    // This is an asynchronous process.
    try {
        await player.load(manifestUri);
        // This runs if the asynchronous load is successful.
        console.log('The video has now been loaded!');
        handleBack()
    } catch (e) {
        // onError is executed if the asynchronous load fails.
        onError(e);
  }
}

function onErrorEvent(event) {
  // Extract the shaka.util.Error object from the event.
  onError(event.detail);
}

function onError(error) {
  // Log the error.
  console.error('Error code', error.code, 'object', error);
}

function handleEnter() {
  if (video.paused) {
        video.play();
  } else {
        video.pause();
  }
}

function handleBack() {
    if (document.getElementById("shaka-version")) {
        document.getElementById("shaka-version").innerHTML = shaka.Player.version
    }
}

document.addEventListener('DOMContentLoaded', initApp);
document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') handleEnter()
    if (event.key === 'Backspace') handleBack()
});