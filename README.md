# TP API

## Installation

### 1. Installation de Docker

Pour installer Docker et Docker Compose, exécute les commandes suivantes :

```sh
apt install -y docker.io docker-compose
sudo usermod -aG docker $USER
```

### 2. Cloner le projet

Clone le repository sur ton machine et accède au dossier du projet :

```sh
git clone https://github.com/Frize01/mds-api-tp.git app
cd app
```

### 3. Configuration du fichier `.env`

#### Option 1 : Copier le fichier `.env` d'exemple

Tu peux copier le fichier `.env.example` en `.env` et le modifier manuellement :

```sh
cp .env.example .env
```

#### Option 2 : Remplir les informations directement dans le fichier `.env`

Sinon, tu peux utiliser les commandes suivantes pour remplir automatiquement les informations dans ton fichier `.env` (pense à remplacer les valeurs par les bonnes informations) :

```sh
echo "NODE_ENV=production" >> .env
echo 'DB_NAME="..."' >> .env
echo 'DB_USERNAME="..."' >> .env
echo 'DB_PASSWORD="..."' >> .env
echo 'DB_HOST="..."' >> .env
echo 'DB_PORT=3306' >> .env
echo 'DB_DIALECT=...' >> .env
echo 'PORT=3000' >> .env
echo 'APP_HOST="..."' >> .env
```

> Pour configurer l'environnement de test local, consultez ce fichier de configuration : [ici](./documentation/default-env.md).

### 4. Informations supplémentaires

Si tu utilises un nom de domaine, il est conseillé d'ajouter `"monsite.com, www.monsite.com"` dans la variable `APP_HOST`.

### 5. Lancer l'application avec Docker

Une fois les informations dans le fichier `.env` configurées, tu peux lancer l'application avec Docker :

```sh
docker-compose up --build -d
```

### 6. Adapter les configurations

Pense à bien adapter les données dans ton fichier `.env` ainsi que dans ton fichier `docker-compose.yml` pour qu'ils correspondent à tes paramètres (ex. base de données, ports, etc.).

## A finir

- test unitaire
- refactor