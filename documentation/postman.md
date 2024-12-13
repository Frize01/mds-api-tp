# Postman

## Collection

1 collection = 1 dossier = 1 projet
+ 1 sous-dossier par ressource

## Automatisation bearer

1. Dans le dossier principal, créer une variable globale "token"
2. Dans la requête "LOGIN", mettre le "script" suivant pour automatiser la récupération du token
```
var responseBody = pm.response.json();
var token = responseBody.token;

pm.collectionVariables.set("token", token);
```
3. Dans les autres requêtes, aller dans "authorisation", sélectionner "Bearer Token". Mettre en valeur ```{{token}}```.

Lors de l'utilisation, il ne reste qu'à déclencher le Login pour que le token soit défini, puis vous pourrez faire les autres requêtes.