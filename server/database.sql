CREATE DATABASE db;

CREATE TABLE user(
    _id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    role VARCHAR(255),
    accessToken VARCHAR(255)
)
