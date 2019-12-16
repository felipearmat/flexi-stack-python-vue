-- Criando BD
CREATE DATABASE app;

-- Criando Usuário a ser utilizado pelo Django
CREATE USER app WITH PASSWORD 'password';
ALTER ROLE app SET client_encoding TO 'utf8';
ALTER ROLE app SET default_transaction_isolation TO 'read committed';
ALTER ROLE app SET timezone TO 'America/Sao_Paulo';
SET TIMEZONE TO 'America/Sao_Paulo';

-- Concedendo privilégios ao usuário do Django
GRANT ALL PRIVILEGES ON DATABASE app TO app;
