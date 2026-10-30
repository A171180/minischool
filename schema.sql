
CREATE DATABASE IF NOT EXISTS mineschool;
USE mineschool;

-- 1. Tables
CREATE TABLE students (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  name       VARCHAR(60),
  email      VARCHAR(100),
  department VARCHAR(60),
  year       INT,
  gpa        DECIMAL(2,1),
  attendance INT,
  joined     DATE
);

CREATE TABLE courses (
  code       VARCHAR(10) PRIMARY KEY,
  title      VARCHAR(60),
  department VARCHAR(60),
  credits    INT
);

CREATE TABLE exams (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  course     VARCHAR(60),
  department VARCHAR(60),
  exam_date  DATE,
  room       VARCHAR(20),
  minutes    INT
);

-- 2. Sample data
INSERT INTO students (name, email, department, year, gpa, attendance, joined) VALUES
('Aarav Sharma', 'aarav.sharma@mineschool.edu', 'Computer Science', 2, 3.7, 94, '2026-09-04'),
('Simran Kaur',  'simran.kaur@mineschool.edu',  'Mathematics',      3, 3.9, 97, '2026-09-06'),
('Rohan Mehta',  'rohan.mehta@mineschool.edu',  'Physics',          1, 3.2, 88, '2026-09-12'),
('Priya Nair',   'priya.nair@mineschool.edu',   'Biology',          4, 3.5, 91, '2026-09-15'),
('Kabir Singh',  'kabir.singh@mineschool.edu',  'Computer Science', 1, 2.9, 82, '2026-09-21'),
('Meera Iyer',   'meera.iyer@mineschool.edu',   'Arts',             2, 3.6, 95, '2026-10-02'),
('Arjun Verma',  'arjun.verma@mineschool.edu',  'Mathematics',      1, 3.1, 86, '2026-10-11'),
('Tanvi Gill',   'tanvi.gill@mineschool.edu',   'Biology',          3, 3.8, 96, '2026-10-24');

INSERT INTO courses (code, title, department, credits) VALUES
('CS101', 'Intro to Programming', 'Computer Science', 4),
('CS240', 'Databases and SQL',    'Computer Science', 3),
('MA120', 'Linear Algebra',       'Mathematics',      4),
('PH110', 'Mechanics',            'Physics',          3),
('BI130', 'Cell Biology',         'Biology',          3),
('AR105', 'Digital Illustration', 'Arts',             2);

INSERT INTO exams (course, department, exam_date, room, minutes) VALUES
('CS101 Intro to Programming', 'Computer Science', '2026-11-09', 'Hall A',   120),
('MA120 Linear Algebra',       'Mathematics',      '2026-11-11', 'Hall B',   150),
('PH110 Mechanics',            'Physics',          '2026-11-14', 'Hall A',   120),
('BI130 Cell Biology',         'Biology',          '2026-11-17', 'Hall C',   90),
('CS240 Databases and SQL',    'Computer Science', '2026-11-20', 'Hall B',   120),
('AR105 Digital Illustration', 'Arts',             '2026-11-24', 'Studio 2', 180);

-- 3. Example queries (same ones as the SQL Explorer page)
SELECT * FROM students;

SELECT name, gpa FROM students WHERE gpa >= 3.7 ORDER BY gpa DESC;

SELECT department, AVG(gpa) AS average_gpa FROM students GROUP BY department;

INSERT INTO students (name, email, department, year, gpa, attendance, joined)
VALUES ('Nisha Rao', 'nisha.rao@mineschool.edu', 'Physics', 1, 3.4, 90, '2026-10-30');

UPDATE students SET gpa = 3.8, year = 3 WHERE id = 1;

DELETE FROM students WHERE id = 5;