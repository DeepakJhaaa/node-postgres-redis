CREATE DATABASE db;
CREATE USER db_user WITH PASSWORD 'admin';
GRANT ALL PRIVILEGES ON DATABASE db to db_user;