CREATE TABLE users(
 userId SERIAL PRIMARY KEY NOT NULL ,
 firstname VARCHAR(100) NOT NULL, 
 lastname VARCHAR(100) NOT NULL,
 username VARCHAR(100) NOT NULL,
 password VARCHAR(255) NOT NULL
 );
 