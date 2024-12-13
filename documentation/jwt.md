# JWT (JSON Web Token)

Un JWT est composé de trois parties :
1. **L'en-tête (header)** : un objet JSON.
2. **La charge utile (payload)** : un objet JSON contenant les informations à transmettre.
3. **La signature** : utilisée pour garantir l'intégrité des données.

Les trois parties sont encodées séparément.
- On encode d'abord l'en-tête, puis la charge utile.
- Ensuite, on concatène les deux en les séparant par un point (`.`).
- Enfin, on génère la signature.

Pour en savoir plus : [JWT.io](https://jwt.io/)

## Installation

Pour installer la bibliothèque `jsonwebtoken` :
```bash
npm install jsonwebtoken --save
```

## Tutoriel : Utilisation de JWT avec Node.js et Express
Consultez ce guide pour apprendre à sécuriser une API avec JWT :
[Article Medium : Sécuriser une API avec Node.js et JWT](https://medium.com/@sbesnier1901/s%C3%A9curiser-une-api-avec-node-js-et-jwt-15e14d9df109)


## Créer un Middleware d'authentification

Pour vérifier la validité d'un token, créez un middleware spécifique dans votre application Express.
