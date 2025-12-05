-- CREATE TABLE users (
--     id INT  PRIMARY KEY,
--     name VARCHAR(100),
--     email VARCHAR(100) UNIQUE,
--     password VARCHAR(100) NOT NULL
    
-- );
-- INSERT INTO users (id, name, email, password) VALUES
-- (1, 'Nandan', 'a@b.com', '1234'),
-- (2, 'Alice', 'c@d.com', '4321');

CREATE TABLE IF NOT EXISTS user7 (
  id VARCHAR(50) PRIMARY KEY,
  username VARCHAR(100),
  email VARCHAR(100),
  password VARCHAR(100)
);
INSERT INTO user7 (id, username, email, password) VALUES
('1', 'Nandan', 'a@b.com', '1234')
