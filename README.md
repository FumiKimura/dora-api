# Doraemon Gadget API

This is a solo project created while attending part-time immersive course at Code Chrysalis

## Objective of Project

1. Create CRUD API service using REST/GraphQL with relational Database
2. Seed database with interesting data

## Advanced Objective

1. Create simple front-end application
2. Write test
3. Deploy the application 

## Getting Started

### 1. Clone project and install dependencies

1. Clone project 
    
    ```bash
    git clone https://github.com/FumiKimura/ccp2-sprint.solo-api.git
    ```
    
2. cd into project directory and install packages
    
    ```bash
    cd ccp2-sprint.solo-api
    npm install
    ```
    

### 2. Creating Database

Postgres database was used in this project. If you don't have postgres installed, make sure to install it first.

1. Start postgres 
    
    ```sql
    psql
    ```
    
2. Create Database
    
    ```bash
    CREATE DATABASE YOUR_DB_NAME
    ```
    

### 3. Setup .env file

In the root project directory, create .env file. This is where you specify login information to the database (.env is in the .gitignore). 

1. Write following to the .env file 
    
    ```bash
    DB_NAME=YOUR_DB_NAME
    DB_USER=YOUR_DB_USERNAME
    DB_PASSWORD=YOUR_DB_PASSWORD
    DB_HOST=YOUR_DB_HOST
    DB_PORT=YOUR_DB_PORT
    ```
    

### 4. Run Migration to Create Tables

1. Run migration
    
    ```bash
    npm run migrate
    ```
    

### 5. Seed the database

This projected used typeorm, so typeorm-seeding package should be used to seed the data. Unfortunately, I have not figured out how to seed the data with many-to-many relationship. If you know how to do it, please kindly reach out.

1. cd into src/sql directory and run following:
    
    ```bash
    psql -d YOUR_DB_NAME -f insertSeed.sql
    ```
    

If seeding was successful, you are ready to start server and calling API!

### 6. Start Express Server

1. Make sure you are in the project directory
    
    ```bash
    npm run start
    ```
    
    if you see "Started Listening to 8080," then server started and listening to port 8080.
    

## API Documentation

**Gadgets**

GET /gadget/allgadget

Result: returns all gadgets in the database

Parameter: None

Example: 

```bash
localhost:8080/gadget/allgadget
```

GET /gadget/gadgetlist?num=n

Result: returns first n gadgets 

Parameter: num=n

Example (returns gadget id = 1 and id = 2 that is first two gadgets):

```bash
localhost:8080/gadget/gadgetlist?num=2
```

GET /gadget/gadgetbyid?id=n

Result: returns gadget with id=n

Parameter: id=n

Example (returns gadget with id = 3):

```bash
localhost:8080/gadget/gadgetbyid?id=3
```

POST /gadget

Result: post new gadget to the database and **returns new gadget if successful**

Parameter: following request body is required

```bash
{
	gadgetName: "new name",
	gadgetType: "new gadget's type",
	owner: characterId
	characters: [array of characterId that uses gadget]
}
```

Example (in cURL):

```bash
curl --location --request POST 'localhost:8080/gadget/' \
--header 'Content-Type: application/json' \
--data-raw '{
    "gadgetName":"Test Name1",
    "gadgetType":"Test Type1",
    "owner": 1,
    "characters":[1, 3]
}'
```

PATCH /gadget?id=n

Result: updated gadget information 

Parameter: 

1. id=n
2. body should only include property that you want to update

Example: Update gadget id = 7's gadgetName and gadgetType

```bash
curl --location --request PATCH 'localhost:8080/gadget?id=7' \
--header 'Content-Type: application/json' \
--data-raw '{
    "gadgetName": "Block",
    "gadgetType": "Door"
}'
```

DELETE /gadget?id=n

Result: deleted gadget information

Parameter: id=n

Example:

```bash
curl --location --request DELETE 'localhost:8080/gadget?id=6'
```

## Character Data

```bash
{firstName: "Doraemon", lastName: null, species: "Robot Cat", age: -91},
{firstName: "Nobi", lastName: "Nobita", species: "Human", age: 10},
{firstName: "Dorami", lastName: null, species: "Robot Cat", age: -94},
{firstName: "Kuruto", lastName: "Hartman", species: "Human", age: 10},
{firstName: "Suneo", lastName: "Honekawa", species: "Human", age: 10},
{firstName: "Takeshi", lastName: "Goda", species: "Human", age: 10},
{firstName: "Shizuka", lastName: "Minamoto", species: "Human", age: 10}
```
