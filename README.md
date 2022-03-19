# Storefront Backend Project
## Getting Started
## Required Technologies
- Postgres for the database
- Node/Express for the application logic
- dotenv  for managing environment variables
- db-migrate from  migrations
- jsonwebtoken  for working with JWTs
- jasmine for testing


## Steps to Completion

## Setup database
psql -U postgres ;

user password:12345;
## Create database 
CREATE DATABASE store
CREATE DATABASE store_test

## To run migrations up
    yarn migration
### .env
    ENV=dev
    pg_host=localhost
    pg_port=5432
    pg_database= store
    pg_database_test= store_test
    pg_user= postgres
    password= 12345
    SALT_ROUNDS=10
    TOKEN_SECRET =your-secret-token
    BCRYPT_PASSWORD=your-secret-password
### Run app
    To install project dependencies
        yarn
    To start app on localhost
        yarn dev
    The application will run on http://localhost:3000/

     To test 
        yarn test

