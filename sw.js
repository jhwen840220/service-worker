const CACHE_NAME = 'static-v1';
// 當service worker在「安裝階段」時會觸發此事件
self.addEventListener('install', function(event) {
    console.log('[Service Worker] Installing Service Worker ...', event);
    
    event.waitUntil(
        // cache a cat SVG
        caches.open(CACHE_NAME)
            // .then(cache => cache.add('/'))
            .then(self.skipWaiting())
    )
});

// 當service worker在「激活階段」時會觸發此事件
self.addEventListener('activate', function(event) {
    console.log('[Service Worker] Activating Service Worker ...', event);
    clients.claim();
});


self.addEventListener('fetch', event => {
    console.log('[Service Worker] Fetch --> ', event.request.url);
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                if(response) {
                    return response;
                }

            })
    )
});
