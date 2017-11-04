# todo-backend-app

## Créer un app server nodejs

``` npm init ```
``` npm i -S express ```

## Install and use nodemon

## Mettre en place l'environnement

1. Install Docker
2. Create .Dockerfile for nodejs app
3. Pull postgres 10 (latest)
3. Create docker-compose.yml ()

Pour avoir les credentials par defaut de PGADMIN4 : https://hub.docker.com/r/fenglc/pgadmin4/

Pour le network (cf. docker-compose.yml), c'est 'postgres' 
  
  * pour adminer, c'est server = 'postgres' 
  * pour PGADMIN4, c'est host name = 'postgres' 

Pour restart juste un container (ici le todo-backend-app) : docker-compose restart todo-backend-app

Pour demarrer en prod : docker-compose up

Pour demarrer en dev : docker-compose -f docker-compose.yml -f docker-compose.dev.yml up

### Connection à la base de donnée

Pour créer la table, vous pouvez : 

* passer par pgadmin4 : http://localhost:5050
* passer par Adminer : http://localhost:8080
* passer par psql : 

``` docker exec -ti ID_DU_CONTAINER_POSTGRES psql -U postgres ```

OR

``` docker exec -ti ID_DU_CONTAINER_POSTGRES bash```
``` psql -U postgres ```

ex.

``` docker exec -ti 6022ed99fb3b psql -U postgres ```

NB : Pour trouver l'ID du container postgres : 

``` docker ps ```

(cette ligne de commande affiche les conainers en cours avec leur ID respectif)

#### Creation de la base en psql

``` CREATE DATABASE todoapp; ```

https://www.tutorialspoint.com/postgresql/postgresql_create_database.htm

### Creation des tables avec db-migrate

https://db-migrate.readthedocs.io/en/latest/Getting%20Started/installation/

#### Pourquoi DB_MIGRATE

Parce qu'il nous permet de configurer des environnement de dev, prod, test et de gérer des migrations.

#### Qu'est ce qu'une migration :

C'est l'action de modifier la structure de la base de données en sauvegardant l'intégrité des données.

Par exemple, on peut ajouter une colonne ou en supprimer une sans recréer toute la base.

db-migrate nous permet d'éxécuter l'action et de revenir en arrière si quelquechose c'est mal passé.

### install les librairie node pour gérer POSTGRES : 

``` npm i -S pg db-migrate db-migrate-pg ```

### Creation du fichier de configuration

Créer un fichier database.json avec les info de connexion à la base de donnée postgres.



