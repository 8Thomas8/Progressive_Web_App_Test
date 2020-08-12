# Test Progressive Web App

Essai de mise en place d'une Progressive Web App.

- `sw.js` = Le service worker. Il doit être à la racine. Il contient des écoutes sur différents event pour enregistrer le cache, mettre à jour le cache, et mettre les requêtes en cache.

- Le service worker est installé grâce au code js dans l'`index.html` 
```javascript
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker
            .register('sw.js')
            .then(() => {
                // registration worked
                console.log('Enregistrement réussi');
            }).catch((error) => {
            // registration failed
            console.log('Erreur : ' + error);
        });
    }
```

- `manifest.json` = A la racine également. Contient les informations de la PWA

## Résultat

La PWA fonctionne, elle s'installe sur les mobiles et elle est consultable hors connexion. Elle n'est pas opti 100%, mais facile à opti avec LightHouse.

## Aides
- https://www.kaliop.com/fr/les-service-workers-vers-la-pwa/
- https://blog.eleven-labs.com/fr/votre-premiere-pwa/
- https://css-tricks.com/serviceworker-for-offline/
