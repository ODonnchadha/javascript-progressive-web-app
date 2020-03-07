var deferredPromptBanner;

if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('/sw.js')
        .then(function() {
            console.log('/sw.js');
    });
}
window.addEventListener('beforeinstallprompt', function(event) {
    console.log('beforeinstallprompt ', event);

    event.preventDefault();
    deferredPromptBanner = event;

    return false;
});