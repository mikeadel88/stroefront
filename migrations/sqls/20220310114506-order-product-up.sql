CREATE TABLE order_product(
    id SERIAL PRIMARY KEY,
    quantity INTEGER,
    order_id INTEGER REFERENCES orders(id),
    product_id INTEGER REFERENCES product(id)
)