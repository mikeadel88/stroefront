 CREATE TABLE orders (
 id SERIAL PRIMARY KEY  NOT NULL,
 status VARCHAR(50),
 user_id INTEGER REFERENCES users (userId) NOT NULL
);