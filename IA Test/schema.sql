CREATE DATABASE IF NOT EXISTS marks;
USE marks;


CREATE TABLE IF NOT EXISTS student (
    usn VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE
    
);

INSERT INTO student (usn, name, email) VALUES
('4MW24CS084','Nandan Nayak','Nandan@hotmail'),
('4MW24CS117','Rohan Mendon','Rohan@hotmail'),
('4MW24CS080','Mayur Kulal','Mayur@hotmail'),
('4MW24CS105','Pranav Okuda','Pranav@hotmail'),
('4MW24CS119','Sagar H','Sagar@hotmail');


CREATE TABLE IF NOT EXISTS marks (
    usn VARCHAR(50) NOT NULL,
    marksIA1 INT NOT NULL,
    marksIA2 INT NOT NULL,
    marksIA3 INT NOT NULL,
    PRIMARY KEY (usn),
    FOREIGN KEY (usn) REFERENCES student(usn)
);
INSERT INTO marks (usn, marksIA1, marksIA2, marksIA3) VALUES
('4MW24CS084', 85, 90, 88),
('4MW24CS117', 78, 82, 80),
('4MW24CS080', 92, 95, 94),
('4MW24CS105',  70, 75, 72),
('4MW24CS119', 88, 84, 86);