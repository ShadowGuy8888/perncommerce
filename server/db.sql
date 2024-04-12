CREATE DATABASE PERNCOMMERCE;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


CREATE TABLE users (
    uid UUID NOT NULL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    email VARCHAR(250) NOT NULL,
    UNIQUE(username),
    UNIQUE(email)
);

CREATE TABLE sold_products (
    uid UUID NOT NULL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(1000) NOT NULL,
    image TEXT NOT NULL,
    price BIGINT NOT NULL,
    available_qty BIGINT NOT NULL,
    user_uid UUID NOT NULL REFERENCES users(uid)
);

CREATE TABLE cart_products (
    uid UUID NOT NULL REFERENCES sold_products(uid),
    qty BIGINT NOT NULL,
    user_uid UUID NOT NULL REFERENCES users(uid)
);

CREATE TABLE order_list (
    product_uid UUID NOT NULL REFERENCES sold_products(uid),
    name VARCHAR(100) NOT NULL,
    description VARCHAR(1000) NOT NULL,
    image TEXT NOT NULL,
    price BIGINT NOT NULL,
    qty BIGINT NOT NULL,
    customer_uid UUID NOT NULL REFERENCES users(uid),
    seller_uid UUID NOT NULL REFERENCES users(uid)
);