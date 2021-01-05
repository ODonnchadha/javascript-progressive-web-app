## Culled from an Udemy class entitled: "Progressive Web Apps: The Complete Guide" 
- by Maximilian Schwarzmuller:

- Getting started: PWAs. What are they?
    1. Features added to any Web pages to enhance them to feel and work like native Web applications.
        - This does not necessarily mean only *responsive.*
    2. Three main descriptors:
        a. Be reliable. Load quick and provide offline functionality.
        b. Fast: Respond quickly to user actions.
        c. Engaging: Feel like a native app on mobile devices.
            - Push notifications. Continually bring a user back to the app.
    3. Mobile Web versus Native Apps.
        - 87% in native app. 13% within mobile Web.
        - Push notifications. Home screen icons. Access to native features. "Work" offline.
        - And we can always bring these things into the Web.
        - Top three apps. 80% of the time. Average user does not install a new app.
        - Lighthouse Chrome (as a Chrome extension.)
        - Perform an audit at how gwellreat your progressive Web app performs.
    4. Our first PWA. Starter Kit.
    ```javascript
        npm install
        mpn audit fix
        npm start
    ```
    5. Core Building Blocks:
        a. Service workers. JavaScript running in a background process. Even if the application is closed.
            - Caching/offline support.
            - Background sync.
            - Web push.
        b. Application manifest. Making the application *installable.*
        c. Responsive design. Looking good across devices.
        d. Geolocation API. Media API. et al.
    6. PWAs versus SPAs.
        a. SPA: Powered by JavaScript. Highly Reactive. Only one HTML file.
            - Framework rerenders the DOM.
        b. PWA: Uses a lot of JavaScript. Aims to be reactive. Works with multiple files.
            - Collection of technologies and techniques.
    7. What is progressive enhamcement?
    8. Course outline:
        - Application manifest.
        - Service worker basics.
        - Promise and the Fetch API.
        - Service worker caching for offline access.
        - Advanced caching strategies.
        - Caching dynamic data with IndexedDB.
        - Responsive design.
        - Background sync.
        - Web push notifications.
        - Media API & Geolocation.
        - Automated SW management.
        - SPAs & PWAs with your #1 framework.

- Understanding the App Manifest:
    1. Single file. Manifest.json. What makes it up? How is it added? And how is it configured?
    2. Why? Type URL or manage bookmark. Allow us to get our Web app on the home screen and drive user engagement.
    3. Add file to public folder. Must be named 'manifest.'
        - NOTE: *All* pages in the app need this link.
        ```html
            <link rel="manifest" href="/manifest.json">
        ```
        - Scope: Which pages are included within the PWA experience? (All pages use these settings.)
        - Display: How should the app load. (No URL bar, for example. The app looks native.) Also, "fullscreen", "minimal-ui", and "browser."
        - Direction: Left-to-right.
        - Orientation: Set, and enforce, default orientation. Restrict with care. Try to support both portrait and landscape.
        - Icons: Configuration. Brower will determine best-fitting.
        - Related Applications: Set-up native applications. From browser to native if so desired.
        ```javascript
            "scope": ".",
            "display": "standalone",
            "dir": "ltr"
        ```
    4. Testing manifest.json with Chrome Dev Tools. Application => Manifest.
    5. Android Studio. Mobile device emulator. With the install feature. Why? Andriod supports Chrome.
    6. Requirements for "Add to Home Screen" banner. *Installation* of the progressive Web App on a mobile phone.
    7. Stupid Safari. On iOS. We add meta tags to help us out.
    8. And IE. NOTE: Every single HTML file needs these.

- Service Workers:
    - "Installing" the application on the homescreen.
    1. Behind the scenes. Offline ready. Next-generation Web application features: Push notifications and background synchronization.
        - JavaScript is single-threaded. Page-loaded JS that can then manipulate the DOM.
        a. They have access to different features. They run on their own thread. They are decoupled from HTML pages.
            - Register the service worker through the page initially.
            - Run under a different 'scope.'
        b. Manages all pages of a given scope. (e.g. all of the pages of a domain.) Lives on after pages have been closed. Runs in the background.
        c. Service workers are *exceptional at reacting to events* since they run in the background.
        d. Again:
            - Runs on an additional thread.
            - Decoupled from HTML pages.
            - Manages all pages of a given scope. e.g.: domain.
            - Lives on even after pages have been closed.
    2. "Listenable" events (in a service worker:)
        a. Fetch. Browser or page-related JavaScript initiates an HTTP request. e.g.: Obtaining an image.
            - The service worker becomes a network proxy.
        b. Push notifications: receiving server notification.
        c. Notification interction: User interaction with displayed notification.
        d. Background sync. e.g.: Failed POST. Internet connect was reestablished.
        e. Service worker lifecycle: SW phase changes. e.g.: While the SW is installing.
    - In startup script, ensure that caching (-c-1) does not occur:
    ```javascript
        "scripts": {
            "start": "http-server -c-1"
        },
    ```
    - (1) Default browser cache and (2) a cache that the service worker uses.
    - With respect to scope, place the sw at the root. Once in a folder, for example, the scope changes to *only* those pages within the subfolder.
    - Scope, by default, *always* is the folder the service worker resides in.
    
    3. Service Worker Lifecycle: Tell the browser that this is not "normal" JS code but a background process.
        a. index.html loads app.js which registers sw.js.
        b. So this registration proicess returns a promise. Thus the .then().
        ```javascript
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker
                    .register('/sw.js')
                    .then(function() {
                        console.log('/sw.js');
                });
            }
        ```
            - Installation => Install event.
            - Activation => Activation event. e.g.: Service worker now controls all pages of Scope.
        b. Registration: (1) Installation event. (2) Activation event. (3) Idle mode. (4) Terminate.
            - Register the service worker in every page that uses it. e.g.: imdex.html and /help/index.html
        c. Browser support.
        d. NOTE: navigator.serviceWorker.register() returns a promise. And they only work via https.
        e. Non-lifecycle events.
        f. And now back to the web app banners page since we have a service worker.
        g. Andriod emulator. Elipsis => More Tools => Remote Devices.
            1. Manifest. "Add to homescreen."
    - More on SW:
        - Known as 'self.' Access to different events, such as 'install' and 'activate.'
        - Updating and activating: 
        - NOTE: If you have a window open with your page, new service workers will become installed but not activated.
        - Close, reopen existing tabs. The *new* version will be activated.
        - You can select 'Update on reload' within developer tools.
        - Non-lifecycle events.
        - 'fetch.' Loading scripts. images. Also, manual triggers. Makes the sw a network proxy.
        ```javascript
            self.addEventListener('fetch', function(event) {
                console.log('fetch ', event);
            });
        ```
    - The App install banner:
        - Criteria: (a) Web app manifest. (b) Service worker. (c) Severed over HTTPS. (d) Visited at least twice over five minute duration.
        - Connect personal device. Within DevTools head to "More Tools" and "Remote Devices." Ensure that "Port forwarding" is enabled.
        - Select 'Manifest' and 'Add to home screen' to trigger manually.
        - 'beforeinstallprompt' event to disallow Chrome to display the app install banner. e.g.: event.preventDefault();

- Promises and Fetch:
    1. Promises can free us from callback hell. Here's a callback function.
    ```javascript
        setTimeout(function() {
            console.log('Executed after timer');
        }, 3000);
        console.log('Executed after setTimeout()');
    ```
    2. Promise rejection:
    ```javascript
        var promise = new Promise(function(resolve, reject) {
            setTimeout(function() {
                resolve('Executed after timer');
                reject('Broken');
            }, 3000);
        })
        promise
            .then(function(txt) {
                console.log(txt);
            }).catch(function(error) {
                console.log(error);
        });
        console.log('Executed after setTimeout()');
    ```
    3. Fetch
        a. Use httpbin.org for both GET and POST examples.
    4. Fetch and CORS: { mode: cors } default. Response contains CORS headers.
        a. HINT: { mode: no-cors } If server does not set the headers.
    5. new XMLHttpRequest(); Synchronous code. More verbose syntax.
        a. Have to use fetch. Only allowed asynchronous within a worker.
    6. Need polyfills for fetch and promise. Note that service workers only work on modern browsers.

```javascript
// e.g.:
var button = document.querySelector('#button');
var output = document.querySelector('#output');
button.addEventListener('click', function() {
    // Create a new Promise and use setTimeout() inside the function that is passed to the constructor.
    var promise = new Promise(function(resolve, reject) {
        // setTimeout() stored inside the Promise.
        setTimeout(function() {
            resolve('https://swapi.co/api/people/1');
        }, 3000);
    });
}).then(function(url) {
    // Promise resolved.
    return fetch(url);
}).then(function(response) {
    return response.json();
}, function(error) {
    console.warn(error);
}).then(function(data) {
    output.textContent = data.name;
});

button.addEventListener('click', function() {
    // Create a new Promise and use setTimeout() inside the function that is passed to the constructor.
    var promise = new Promise(function(resolve, reject) {
        // setTimeout() stored inside the Promise.
        setTimeout(function() {
            resolve('https://httpbin.org/put');
        }, 3000);
    });
}).then(function(url) {
    // Promise resolved.
    return fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type' : 'application/json',
            'Accept' : 'application/json'
        },
        body: JSON.stringify( {person: {name: 'X', age: 0}} )
    });
}).then(function(response) {
    return response.json();
})
.then(function(data) {
    output.textContent = data.json.person.name;
})
.catch(function(error) {
    // Catch any error.
    console.warn(error);
});

// Get
fetch('https://httpbin.org/ip').then(function(response) {
        return response.json();
    }).then(function(data) {
        console.log(data);
    }).catch(function(error) {
        console.warn(error);
});

// Post
fetch('https://httpbin.org/post', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    body: JSON.stringify({message: 'xyz'})
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
        console.log(data);
    }).catch(function(error) {
        console.warn(error);
});
```

- Service Worker Caching: Offline capable.
    1. Whys? Poor connection. No connection. Lie-fie.
    2. The cache API. Multiple caches. Server (across the wire.) Browser. (Without explicit code.)
        a. Key/value pairs. Request and response.
        b. Service worker -> Cache <- JavaScript pages.
        c. Retrieved versus sending network request.
    3. Experimental technology. Incremental enhancement.
    4. So... what do we want to cash? Identifying cacheable items.
    5. Static pre-caching. Reminder: Service worker is only *installed* if it has changed.
        a. Cache the assets that do not change, e.g.: App Shell, upon installation.
        b. Do not overpopulate cache. Browser may 'clean it up.' Danger of lax in loading items
        c. event.waitUntil() ensures completion before we blow past the installation handler.
        d. event.request within the 'fetch' obtains the request object. 
        e. So any sub-cache object with a match is returned. Returns null response. Do not catch.
    6. The importance of storing the root '/' request. We cache requests. READ: URLs.
    7. We should conditionally load the polyfills and not cache them.
    8. Dynamic cache. Return entire promise to the chain.
    ```javascript
    return caches.open(CACHE_DYNAMIC_NAME)
        .then(function(cache) {
            cache.put(event.request.url, res.clone());
            return res;
        })
    ```
    9. Handling errors.
    10. We are currently storing everything that we fetch in the dynamic cache. 
        a. Manage cache versions rather than *update* the service worker.
        b. e.g.: CACHE_STATIC_NAME = 'static-v4';
    11. Clean up former caches based upon versioning. We could fetch an outdated version.
    12. Optimizing:
    13. Assignment: 
        a. Ensure that we finish the installation before we begin caching. e.g.: event.waitUntil()
        b. 'activate' runs at the start of a page being loaded. Will not interfere with an ongoing sw.