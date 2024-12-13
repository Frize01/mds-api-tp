# MODELE DE RICHARDSON

## Level 0 : The Swamp of POX

Le point d'entrée vers l'application est unique et un seul verbe HTTP (GET ou POST) est utilisé par les requêtes du client.

## Level 1 : Resources

Ce niveau de maturité consiste en l’utilisation de plusieurs URIs comme points d’entrée du système d’information mais d’un seul verbe HTTP (GET ou POST).

## Level 2 : HTTP Verbs

Utilisation des méthodes HTTP autres que GET et POST pour signifier l’action souhaitée : PATCH / PUT / DELETE. 
Ajout des codes de statut HTTP pour indiquer le résultat de l’opération.

## Level 3 : Hypermedia Controls

Les réponses contiennent des liens vers d’autres ressources. Les clients peuvent naviguer à travers l’API en suivant les liens.
L’API ReST devient alors <b>discoverable</b>.

https://guide-api-rest.marmicode.fr/api-rest/le-modele-de-maturite-de-richardson

