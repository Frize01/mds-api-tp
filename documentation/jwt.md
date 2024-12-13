# JWT (Json Web Token)

Se compose en 3 parties :
- Un en-tête --> objet JSON
- Une charge utile (payload) --> objet JSON (info que l'on transmettre)
- Une signature

On encode les 3 parties séparemment.
D'abord l'entete puis la payload et on concatène les 2 en les séparant d'un "."
On obtient la signature.

https://jwt.io/ []


## Installation

```npm install jsonwebtoken --save```

Tuto utilisation de JWT avec nodejs/express
https://medium.com/@sbesnier1901/s%C3%A9curiser-une-api-avec-node-js-et-jwt-15e14d9df109

Créer middleware d'authentification pour vérifier la validité du token.