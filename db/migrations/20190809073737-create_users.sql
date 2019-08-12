
-- +migrate Up
CREATE TABLE users (
       id       int,
       nickname varchar(255),
       email    varchar(255));
INSERT INTO users (id, nickname, email) VALUES ( 1, 'Ichiro', 'ichiro@email.com');
INSERT INTO users (id, nickname, email) VALUES ( 2, 'Jiro',   'jiro@email.com');
INSERT INTO users (id, nickname, email) VALUES ( 3, 'Saburo', 'saburo@email.com');

-- +migrate Down
DROP TABLE users;
