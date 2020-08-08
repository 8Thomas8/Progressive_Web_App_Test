const CACHE_NAME = 'pwa';
const urlsToCache = [
    '/',
    '/sw.js',
    '/index.html',
    '/assets/app.js',
    '/assets/style.css',
    '/assets/image.png',
]

// Enregistre les fichiers dans le cache
self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache)
                    .then(() =>
                        self.skipWaiting()
                    );
            })
    )
});

// Suppression des fichiers cachés obsolètes.
self.addEventListener('activate', function (event) {

    const cacheWhitelist = [CACHE_NAME];

    event.waitUntil(
        // Check de toutes les clés de cache.
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Gestion des requêtes pour les mettre en cache et rendre la page disponible hors connexion
self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                // Cache hit - return response
                if (response) {
                    return response;
                }

                // IMPORTANT: Cloner la requête.
                // Une requete est un flux et est à consommation unique
                // Il est donc nécessaire de copier la requete pour pouvoir l'utiliser et la servir
                var fetchRequest = event.request.clone();

                return fetch(fetchRequest).then(
                    function (response) {
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // IMPORTANT: Même constat qu'au dessus, mais pour la mettre en cache
                        var responseToCache = response.clone();

                        caches.open(CACHE_NAME)
                            .then(function (cache) {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    }
                );
            })
    );
});
