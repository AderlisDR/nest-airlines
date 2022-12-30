# NestJS Airlines API

## Table of contents

* [General info](#general-info)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Local Installation](#local-installation)
* [Local Development](#local-development)
  * [Setting up database connection](#setting-up-database-connection)
  * [Starting Postgresql server](#starting-postgresql-server)
  * [Running migrations](#running-migrations)
  * [Seeding the Database](#seeding-the-database)
  * [Starting the server](#starting-the-server)
  * [Generating migrations](#generating-migrations)
* [Troubleshooting](#troubleshooting)

---

## General Info

A simple NestJS API for CRUD operations on airports, airlines and flights.

---

## Getting Started

### Prerequisites

* [NodeJS](https://nodejs.org/en/download/) (version >= 12, except for v13)
* [NestJS](https://nestjs.com/)
* [Visual Studio Code](https://code.visualstudio.com/download) or any code editor of your preference.
* [Docker Desktop](https://www.docker.com/products/docker-desktop/)

### Local Installation

1. Oper your terminal/console in the project root directory.
2. Run `npm install` to get all dependencies.
3. [Set your database connection](#setting-up-database-connection).
4. [Get database server up and running](#starting-postgresql-server).
5. [Run migrations](#running-migrations).
6. [(Optional) Seeding the database](#seeding-the-database).
7. [Start the server](#starting-the-server).

To make sure that everything worked as spected open your web browser and go to <http://localhost:3000>, here you should be able to see the API swagger documentation.

---

## Local Development

First you should be able to run the API locally, if you are not able to do so, please make sure to revisit [Getting Started](#getting-started) and [Troubleshooting](#troubleshooting).

### Setting up database connection

Under the project root directory, create a file named **`.env`** and add the following variables:

```env
POSTGRES_HOST=127.0.0.1
POSTGRES_PORT={{SERVER_PORT}}
POSTGRES_USER=postgres
POSTGRES_PASSWORD={{DB_PASWORD}}
POSTGRES_DATABASE={{DB_NAME}}
PORT=3000
MODE=DEV
RUN_MIGRATIONS=true
```

> **`{{SERVER_PORT}}`** - Available port in your computer to which the Docker host will map the Postgresql server port.  
> **`{{DB_PASWORD}}`** - Password to connect to the DB.  
> **`{{DB_NAME}}`** - Name of the DB to connect.

### Starting Postgresql server

Make sure that Docker Desktop is up and running, then open your terminal/console in the project directory and run:

```bash
npm run start:dev:db -- {{DB_NAME}} {{DB_PASWORD}} {{SERVER_NAME}} [[SERVER_PORT]]
```

> **Notes:** Make sure to pass all the arguments in their corresponding order, this values will be use by the script to start a fresh Postgresql server and database when you run the command. Also make sure that this values are exactly the same as your variables in your **`.env`** file.  
> **`{{DB_NAME}}`** - Name for the new database.  
> **`{{DB_PASWORD}}`** - Password for the new database.  
> **`{{SERVER_NAME}}`** - Name for the server.  
> **`[[SERVER_PORT]]`** - (Optional) Port in your computer to map the container port, if none is provided then 5432 will be used, so if you don't provide any, make sure that your **`.env`** file contains: **`POSTGRES_PORT=5432`** variable.

### Running migrations

To run the migrations, open your terminal/console in the project root directory and run:

```bash
  npm run typeorm:migration:run
```

### Seeding the Database

To run seeds in the database, open your terminal/console in the project root directory and run:

```bash
  npm run db:seed
```

### Starting the server

To start the server, open your terminal/console in the project root directory and run:

```bash
  npm run start:dev
```

### Generating migrations

To generate a new migration, open your terminal/console in the project root directory and run:

```bash
  npm run typeorm:migration:generate -- ./src/db/migrations/{YourMigrationName}
```

Then, you can review your migration going into *`src >> db >> migrations`*, here you shoul be able to se a new file with {YourMigrationName} on it.

---

## Troubleshooting

If you're on Mac, you might enconter some troubles when running `npm run start:dev:db` command. This might be produced because you don't have the required permissions to execute the script, to fix this, open your terminal/console inside *`src >> scripts`* from the project root directory and run:

```bash
  sudo chmod 755 'start-dev-db.sh'
```

This command will give to your user the permission to execute the script.

If you're on Windows, you'll need to do some installation and execute the script file manually if you want to get the Postgresql server started, for this follow the next steps:

1. Go to *`Settings > Update & Security > For Developers`*.
2. Check the *`Developer Mode`* radio button.
3. Search for "*`Windows Features`"*, choose “*`Turn Windows features on or off`*”.

Scroll to find WSL, check the box, and then install it. Once done, one has to reboot to finish installing the requested changes. Press Restart now. BASH will be available in the Command Prompt and PowerShell.

To execute the script, open Command Prompt and navigate to *`src >> scripts`* from the project root directory, then run:

```bash
  bash start-dev-db.sh
```
