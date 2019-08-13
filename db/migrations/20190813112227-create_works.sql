
-- +migrate Up
CREATE TABLE works (
       id         serial PRIMARY KEY,
       title      varchar(255),
       title_kana varchar(255));
INSERT INTO works (title, title_kana) VALUES ('作品1', 'サクヒン1');
INSERT INTO works (title, title_kana) VALUES ('作品2', 'サクヒン2');
INSERT INTO works (title, title_kana) VALUES ('作品3', 'サクヒン2');

-- +migrate Down
DROP TABLE works;
