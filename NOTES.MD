## Culled from an Udemy class entitled:
## "Progressive Web Apps: The Complete Guide" 
- by Maximilian Schwarzmuller:

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

#### Understanding the App Manifest:
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