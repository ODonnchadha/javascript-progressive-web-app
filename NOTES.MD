Progressive Web Apps by Maximilian Schwarzmuller

- Getting started: PWAs. What are they?
    1. Features added to any Web pages to enhance them to feel and work like native Web applications.
        - This does not necessarily mean only *responsive.*
    2. Three main descriptors:
        a. Be reliable. Load quick and provide offline functionality.
        b. Fast: Respond quickly to user actions.
        c. Engaging: Feel like a native app on mobile devices.
    3. Mobile Web versus Native Apps. Lighthouse Chrome (as a Chrome extension.)
    4. Our first PWA. Gosh. Starter Kit.
    5. Core Building Blocks
        a. Service workers. JavaScript running in a background process. Even if the application is closed.
        b. Application manifest. Making the application *installable.*
        c. Responsive design.
        d. Geolocation API. Media API. et al.
    6. PWAs versus SPAs.
        a. SPA: Powered by JavaScript. Highly Reactive. Only one HTML file.
        b. PWA: Uses a lot of JavaScript. Aims to be reactive. Works with multiple files.
    7. Progrssive Enhamcement.

- Understanding the App Manifest:
    1. Single file.
    2. Why? Allow us to get our Web app on the home screen.
    3. Where? How to test our minifest.json name/values. Application => Manifest within Chrome Debugger Tools.
    4. Android Studio. Mobile device emulator. With the install feature.
    5. *Installation* of the progressive Web App on a mobile phone.
    6. Stupid Safari. We add meta tags to help us out.
    7. And IE.

- Service Workers:
    1. Behind the scenes. Offline ready. Next-generation. JavaScript is single-threaded.
        a. They run on their own thread. They are decoupled from HTML pages. 
        b. Manages all pages of a given scope. Lives on after pages have been closed. Run in the background.
        c. Service workers are exceptional at reacting to events.
    2. Listenable events: 
        a. Fetch. Push notifications. Notification interaction. 
        b. Background sync. e.g.: Failed POST. Service worker lifecycle.
    3. Service Worker Lifecycle:
        a. index.html loads app.js which registers sw.js.
        ```javascript
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker
                    .register('/sw.js')
                    .then(function() {
                        console.log('/sw.js');
                });
            }
        ```
        b. Registration: (1) Installation event. (2) Activation event. (3) Idle mode. (4) Terminate.
        c. Browser support.
        d. NOTE: navigator.serviceWorker.register() returns a promise. And they only work via https.
        e. Non-lifecycle events.
        f. And now back to the web app banners page since we have a service worker.
        g. Andriod emulator. Elipsis => More Tools => Remote Devices.
            1. Manifest. "Add to homescreen."