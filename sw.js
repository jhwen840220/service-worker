const CACHE_NAME = 'static-v2';
const DYNAMIC_NAME = 'dynamic';
const FILES_TO_CACHE = [
	'/',
    '/index.html',
    '/index.js',
    '/main.css',
    '/horse.svg',
];
// 當service worker在「安裝階段」時會觸發此事件
self.addEventListener('install', function(event) {
    console.log('[Service Worker] Installing Service Worker ...', event);
    
    event.waitUntil(
        // cache a cat SVG
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(FILES_TO_CACHE))
            .then(self.skipWaiting())
    )
});

// 當service worker在「激活階段」時會觸發此事件
self.addEventListener('activate', function(event) {
    console.log('[Service Worker] Activating Service Worker ...', event);
    
    event.waitUntil(
		//遍歷當前快取keys
		caches.keys().then((cacheNames) => {
		  return Promise.all(cacheNames.map((cacheName) => {
			if (cacheName !== CACHE_NAME) {
			  console.log('[ServiceWorker] Removing old cache', cacheName);
			  return caches.delete(cacheName);
			}
		  }));
		})
		.then(() => self.clients.claim())
	)
});


self.addEventListener('fetch', event => {
    console.log('[Service Worker] Fetch --> ', event.request.url);

    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                if(response) {
                    return response;
                }
                else {
                    return fetch(event.request);
                }
            })
    )
});