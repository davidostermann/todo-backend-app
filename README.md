# todo-backend-app

## Créer un app server nodejs

``` npm init ```
``` npm i -S express ```

## Install and use nodemon

## Mettre en place l'environnement

1. Install Docker
2. Create .Dockerfile for nodejs app
3. Pull postgres 10 (latest)
4. Create docker-compose.yml (cf. docker-compose.yml)

Vous pouvez acceder à chaque container en récupérant l'ID du container, puis en éxécutant bash ou shell.

``` docker ps ```

```docker exec -ti ID_CONTAINER bash ```
OU
``` docker exec -ti ID_CONTAINER /bin/sh ```
OU
``` docker exec -ti ID_CONTAINER /bin/bash ```

Et pour ajouter bash (au cas où), ajouter au .Dockerfile

``` RUN apk add --no-cache bash ```

Et pour voir les variables d'environnement :

``` printenv ```

## Démarrer l'environnement (les containers)

Pour demarrer en prod : 

```docker-compose up```

Pour demarrer en dev : 

``` docker-compose -f docker-compose.yml -f docker-compose.dev.yml up ```

Pour restart juste un container (ici le todo-backend-app) : 

``` docker-compose restart todo-backend-app ```

### Connection à la base de donnée

Pour accéder à postgres, vous pouvez : 

#### passer par pgadmin4 : http://localhost:5050

Pour avoir les credentials par defaut de PGADMIN4 : https://hub.docker.com/r/fenglc/pgadmin4/ 

Le hostname, c'est 'postgres'. (cf. docker-compose.yml networks setting)

#### passer par Adminer : http://localhost:8080

Le server, c'est 'postgres'. (cf. docker-compose.yml networks setting)

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

#### Alternatives :

https://github.com/salsita/node-pg-migrate
https://github.com/vitaly-t/pg-promise

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

https://db-migrate.readthedocs.io/en/latest/Getting%20Started/configuration/

``` 
{
  "dev": {
    "driver": "pg",
    "user": "postgres",
    "password": "changeme",
    "host": "localhost",
    "database": "tododb"
  }
} 
```

### Créer notre premiere table

Avec db-migrate :

``` db-migrate create create-todos-table ``` 

la config 'dev' est celle par défaut.

Après on remplit le fichier de migration.

On va créer une table "todos".

const { Client } = require('pg')
const client = new Client()

await client.connect()





