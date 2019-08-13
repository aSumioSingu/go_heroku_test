
-- +migrate Up
CREATE TABLE users (
       id       serial PRIMARY KEY,
       nickname varchar(255),
       email    varchar(255));
INSERT INTO users (nickname, email) VALUES ('Ichiro', 'ichiro@email.com');
INSERT INTO users (nickname, email) VALUES ('Jiro',   'jiro@email.com');
INSERT INTO users (nickname, email) VALUES ('Saburo', 'saburo@email.com');

-- +migrate Down
DROP TABLE users;
