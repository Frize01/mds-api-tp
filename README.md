# TP API

## Installation

Installation de docker
```sh
apt install -y docker.io docker-compose
sudo usermod -aG docker $USER
```

Clône du projet
``` sh
git clone https://github.com/Frize01/mds-api-tp.git app
cd app
cp  .env.example .env
docker-compose up --build -d
```
Changer les données du .env avec les data que vous souhaitez et adapté docker-compose avec les mêmes data.

## A finir
- swagger (doc)
- JWT
- PostMan
- socket io
- crud
- test unitaire


## Routes imposées

- **Utilisateur** - _/users_
    - **POST** - _/users_
    - **GET** - _/users/role/{role}_
    - **GET** - _/users/{id}_
    - **PUT** - _/users/{id}_
    - **DELETE** - _/users/{id}_
- **Produits** - _/products_
    - **POST** - _/products_
    - **GET** - _/products_
    - **GET** - _/products/{id}_
    - **PUT** - _/products/{id}_
    - **DELETE** - _/products/{id}_
- **Commandes** - _/orders_
    - **POST** - _/orders_
    - **GET** - _/orders_
    - **GET** - _/orders/{id}_
    - **PUT** - _/orders/{id}_
    - **DELETE** - _/orders/{id}_
- **Tournées** - _/delivery-tours_
    - **POST** - _/delivery-tours_
    - **GET** - _/delivery-tours_
    - **GET** - _/delivery-tours/{id}_
    - **PUT** - _/delivery-tours/{id}_
    - **DELETE** - _/delivery-tours/{id}_
- **Commentaires** - _/products/{id}/comments_
    - **POST** - _/products/{id}/comments_
    - **GET** - _/products/{id}/comments_
    - **GET** - _/products/{id}/comments/{id}_
    - **PUT** - _/products/{id}/comments/{id}_
    - **DELETE** - _/products/{id}/comments/{id}_
- **Messages** - _/messages_
    - **POST** - _/messages_
    - **GET** - _/messages_
    - **GET** - _/messages/{id}_
    - **PUT** - _/messages/{id}_
    - **DELETE** - _/messages/{id}_
- **Demande d'affection** - _/assignment-requests_
    - **POST** - _/assignment-requests_
    - **GET** - _/assignment-requests_
    - **GET** - _/assignment-requests/{id}_
    - **PUT** - _/assignment-requests/{id}_
    - **DELETE** - _/assignment-requests/{id}_
