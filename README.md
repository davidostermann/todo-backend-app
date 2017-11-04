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

Pour le network (cf. docker-compose.yml), c'est 'postgres' (pour adminer, c'est le server)

Pour restart juste un container (ici le todo-backend-app) : docker-compose restart todo-backend-app

Pour demarrer en prod : docker-compose up

Pour demarrer en dev : docker-compose -f docker-compose.yml -f docker-compose.dev.yml up

## Créer l'app

### install les librairie node pour gérer POSTGRES : 

``` npm i -S pg db-migrate db-migrate-pg ```



