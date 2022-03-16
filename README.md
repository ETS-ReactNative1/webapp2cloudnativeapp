# webapp2cloudnativeapp

## Overview

Sample web applications with PostgreSQL/AppID/Redis.

- v1

  - Simple Web application without error handling.

  - Application would be crushed when PostgreSQL would be restarted.

  - Application can NOT be scaled out for AppID session.

- v2

  - Advanced Web application with error handling.

  - Application would **NOT** be crushed even when PostgreSQL would be restarted.

  - Application can be scaled out for AppID session.

- v3

  - **Cloud Native** Web application.

  - **API server** has been separated from frontend application server.

  - API server would **NOT** be crushed even when PostgreSQL would be restarted.

  - Application can be scaled out for AppID session.

- v4

  - **Single Page** Web application with Frontend.

  - **API server** has been separated from frontend application server.

  - API server would **NOT** be crushed even when PostgreSQL would be restarted.

  - Application can be scaled out for AppID session **without Redis**.

  - Application can be run on simple HTTP server.

  - You need to edit public/index.html file with following information:

    - (L.25)'apiserver` : URL of API Server

    - (L.26)'appid_client_id` : ClientID value of AppID

    - (L.27)'appid_endpoint` : Discovery URL value of AppID

- v5

  - **Cloud Native** Web application with **React** Frontend.


## Description for "Cloud-Native"ness

**Micro services** is one of main element for Cloud Native application. Developing front-end application can be elastic with container-like infrastructure, but there are no live guarantee for back end services, like Database. Cloud Native application need to handle back-end maintenances.

This sample application can handle database maintenances. Even if DB would stop suddenly, this application would handle that exception event, tries to reconnect(tries to create connection pool), and would behave as normal again.


## Demo scenario

1. Start DB(as docker container, for example)

  - Create schema, if needed.

    - `create table if not exists items ( id varchar(50) not null primary key, name varchar(50) default '', price int default 0, username varchar(50) default '', created bigint default 0, updated bigint default 0 );`

2. Run application, and connect to that DB.

3. Use application. Create/Read/Update/Delete data.

4. Stop DB.

5. Restart DB again.

6. Confirm if you would be able to use running application so that there would be no DB restart(, because application automatically reconnect to DB again).


## Environment values

- Following values need to be set:

  - `POSTGRES_DATABASE_URL` : URL connection string for PostgreSQL

    - v1, v2, v3(api), v4(api), v5(api)

  - `REDIS_DATABASE_URL` : URL connection string for Redis(, as session server if needed)

    - v1, v2, v3(app)

  - `REACT_APP_APISERVER` : URL of API server

    - v3(app), v5(app)

    - Edit index.html for v4(app)


- Following all seven values need to be set, if you use AppID as IDaaS:

  - `APPID_REGION` : Callback URL after authentication with AppID

  - `APPID_TENANTID` : Tenant ID for AppID

  - `APPID_APIKEY` : API Key for AppID

  - `APPID_SECRET` : API Secret for AppID

  - `APPID_CLIENTID` : Client ID for AppID

  - `APPID_REDIRECTURI` : Callback URL after authentication with AppID

  - `APPID_OAUTHSERVERURL` : OAuth server name for AppID

    - v1, v2, v3(app) for above all

  - `APPID_CLIENTID` : Client ID for AppID

  - `APPID_ENDPOINT` : OAuth server name for AppID

    - v5(app) for above two

    - Edit index.html for v4(app)


## Running data services on docker

- PostgreSQL

  - `$ docker run -d --name postgres -p 5432:5432 -e POSTGRES_USER=user -e POSTGRES_PASSWORD=pass -e POSTGRES_DB=db postgres`

  - `$ docker container exec -it postgres bash`

  - `# psql -U user -d db`

  - `db=# create table if not exists items ( id varchar(50) not null primary key, name varchar(50) default '', price int default 0, created bigint default 0, updated bigint default 0 );`

- Redis

  - `$ docker run --name redis -d -p 6379:6379 redis`


## AppID config

- Specify Callback URL for AppID Auth:

  - Set `(appserver)/appid/callback` for v1, v2, v3(app)

  - Set `(appserver)` for v4(app), v5(app)


## Licensing

This code is licensed under MIT.


## Copyright

2022 K.Kimura @ Juge.Me all rights reserved.

