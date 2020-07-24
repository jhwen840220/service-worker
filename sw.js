// 當service worker在「安裝階段」時會觸發此事件
self.addEventListener('install', function(event) {
    console.log('[Service Worker] Installing Service Worker ...', event);
    
    event.waitUntil(
        // cache a cat SVG
        caches.open('static-v1')
            .then(cache => cache.add('/cat.svg'))
    )
     
    self.skipWaiting();
});

// 當service worker在「激活階段」時會觸發此事件
self.addEventListener('activate', function(event) {
    console.log('[Service Worker] Activating Service Worker ...', event);
    clients.claim();
});


self.addEventListener('fetch', event => {
    const url = new URL(event.request.url);
  
    if (url.origin == location.origin && url.pathname == '/dog.svg') {
      event.respondWith(caches.match('/cat.svg'));
    }
});