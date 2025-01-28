# Utiliser une image de base pour Node.js 22
FROM node:22

# Définir le répertoire de travail
WORKDIR /app

# Copier le fichier package.json et installer les dépendances
COPY package*.json ./
RUN npm install -g npm
RUN npm install

# Installer Sequelize CLI globalement
RUN npm install -g sequelize-cli

# Copier le reste de l'application
COPY . .

# Exposer le port utilisé par l'application
EXPOSE 3000

# Exécuter les migrations et démarrer l'application
CMD sh -c "npx sequelize-cli db:migrate && npm start"