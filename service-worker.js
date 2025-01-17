const CACHE_NAME = 'quiz-app-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/style/question.css',
    '/script.js', // Add your external JS file path here
    'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.7/MathJax.js?config=TeX-MML-AM_CHTML', // Caching MathJax library
    '/App.png', // Cache app icon
    '/quranmp3.png', // Cache app icon for your Quran app
    '/images/logo.png', // Cache logo image
    '/Free Study Material.apk', // Cache APK link
    '/com_alquran_hadith_app.apk', // Cache APK link
    '/Com_studymaterial_app_v1.apk', // Cache APK link
];

self.addEventListener('install', (event) => {
    // Pre-cache assets
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('activate', (event) => {
    // Clean up old caches
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', (event) => {
    // Serve files from cache if available
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            return cachedResponse || fetch(event.request);
        })
    );
});
