# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Users
- Index 
    endpoint: "/users"
    HTTP Verb : GET
- Show
    endpoint:"/users/:id"
    HTTP Verb : GET
- Create [token required]
    endpoint:"/users"
    HTTP Verb : POST
    Request body:
    {
        "fristname":"ttest"
        "lastname":"adel"
        "username" :"mikeadel",
        "password": "123535"
    }
- Authenticate
    endpoint :"users/authenticate"
    HTTP Verb : POST
    Request body :
    {
        "username" :"mikeadel",
        "password": "123535"
    }


#### Products
- Index [token required]
    endpoint:"/products"
    HTTP verb : GET
- Show [token required]
    endpoint:"/products/:id"
    HTTP Verb : GET
- Create N[token required]
    endpoint:"/products"
    HTTP Verb :POST
#### Orders
- Index [token required]
    endpoint :"/orders"
    HTTP Verb : GET
- Show [token required]
    endpoint :"/orders"
    HTTP Verb :GET
- Create [token required]
    endpoint :"/orders"
    HTTP Verb:POST
    Request body:
    {
        "status":"active",
        "user_id":1
    }
- Add Product to order [token required]
    endpoint:"/orders/:id/product"
    HTTP Verb:POST
    Request body :
    {    
        "productId":1,
        "quantity":20
    }
- Current Order by user (args: user id)[token required]
    endpoint:"/orders/users/:id"
    HTTP Verb :GET

## Data Shapes
#### Product
CREATE TABLE product 
(id SERIAL PRIMARY KEY NOT NULL,
name VARCHAR(100) NOT NULL,
price INTEGER NOT NULL);
#### User
CREATE TABLE users(
 userId SERIAL PRIMARY KEY NOT NULL ,
 firstname VARCHAR(100) NOT NULL, 
 lastname VARCHAR(100) NOT NULL,
 username VARCHAR(100) NOT NULL,
 password VARCHAR(255) NOT NULL
 );
#### Orders
 CREATE TABLE orders (
 id SERIAL PRIMARY KEY  NOT NULL,
 status VARCHAR(50),
 user_id INTEGER REFERENCES users (userId) NOT NULL
);
#### Orders Product
CREATE TABLE order_product(
    id SERIAL PRIMARY KEY,
    quantity INTEGER,
    order_id INTEGER REFERENCES orders(id),
    product_id INTEGER REFERENCES product(id)
)

