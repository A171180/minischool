-- MineSchool database (MySQL 8). Not used by the Phase 1 frontend.
-- Run: mysql -u root -p < schema.sql
CREATE DATABASE IF NOT EXISTS mineschool CHARACTER SET utf8mb4;
USE mineschool;

CREATE TABLE departments (
  id   INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(60) NOT NULL UNIQUE
);

CREATE TABLE students (
  id       INT AUTO_INCREMENT PRIMARY KEY,
  name     VARCHAR(60)  NOT NULL,
  email    VARCHAR(100) NOT NULL UNIQUE,
  dept_id  INT NOT NULL,
  year     TINYINT NOT NULL CHECK (year BETWEEN 1 AND 4),
  gpa      DECIMAL(2,1) NOT NULL CHECK (gpa BETWEEN 0 AND 4),
  joined   DATE NOT NULL DEFAULT (CURRENT_DATE),
  FOREIGN KEY (dept_id) REFERENCES departments(id)
) AUTO_INCREMENT = 1001;

CREATE TABLE courses (
  code    VARCHAR(8) PRIMARY KEY,
  title   VARCHAR(50) NOT NULL,
  dept_id INT NOT NULL,
  credits TINYINT NOT NULL CHECK (credits BETWEEN 1 AND 6),
  FOREIGN KEY (dept_id) REFERENCES departments(id)
);

CREATE TABLE enrollments (
  student_id  INT NOT NULL,
  course_code VARCHAR(8) NOT NULL,
  PRIMARY KEY (student_id, course_code),
  FOREIGN KEY (student_id)  REFERENCES students(id) ON DELETE CASCADE,
  FOREIGN KEY (course_code) REFERENCES courses(code) ON DELETE CASCADE
);

CREATE TABLE exams (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  course_code VARCHAR(8) NOT NULL,
  exam_date   DATE NOT NULL,
  room        VARCHAR(20) NOT NULL,
  minutes     SMALLINT NOT NULL,
  FOREIGN KEY (course_code) REFERENCES courses(code) ON DELETE CASCADE
);

CREATE TABLE attendance (
  student_id INT NOT NULL,
  day        DATE NOT NULL,
  present    BOOLEAN NOT NULL,
  PRIMARY KEY (student_id, day),
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
);

-- Sample data (same as mock-data.js)
INSERT INTO departments (name) VALUES
 ('Computer Science'),('Mathematics'),('Physics'),('Biology'),('Arts');

INSERT INTO students (name, email, dept_id, year, gpa, joined) VALUES
 ('Aarav Sharma','aarav.sharma@mineschool.edu',1,2,3.7,'2026-09-04'),
 ('Simran Kaur','simran.kaur@mineschool.edu',2,3,3.9,'2026-09-06'),
 ('Rohan Mehta','rohan.mehta@mineschool.edu',3,1,3.2,'2026-09-12'),
 ('Priya Nair','priya.nair@mineschool.edu',4,4,3.5,'2026-09-15'),
 ('Kabir Singh','kabir.singh@mineschool.edu',1,1,2.9,'2026-09-21'),
 ('Meera Iyer','meera.iyer@mineschool.edu',5,2,3.6,'2026-10-02'),
 ('Arjun Verma','arjun.verma@mineschool.edu',2,1,3.1,'2026-10-11'),
 ('Tanvi Gill','tanvi.gill@mineschool.edu',4,3,3.8,'2026-10-24');

INSERT INTO courses (code, title, dept_id, credits) VALUES
 ('CS101','Intro to Programming',1,4),('CS240','Databases and SQL',1,3),
 ('MA120','Linear Algebra',2,4),('PH110','Mechanics',3,3),
 ('BI130','Cell Biology',4,3),('AR105','Digital Illustration',5,2);

INSERT INTO exams (course_code, exam_date, room, minutes) VALUES
 ('CS101','2026-11-09','Hall A',120),('MA120','2026-11-11','Hall B',150),
 ('PH110','2026-11-14','Hall A',120),('BI130','2026-11-17','Hall C',90),
 ('CS240','2026-11-20','Hall B',120),('AR105','2026-11-24','Studio 2',180);

-- Queries shown in the SQL Explorer page
SELECT * FROM students;
SELECT name, gpa FROM students WHERE gpa >= 3.7 ORDER BY gpa DESC;
INSERT INTO students (name, email, dept_id, year, gpa)
  VALUES ('Nisha Rao','nisha.rao@mineschool.edu',3,1,3.4);
UPDATE students SET gpa = 3.8, year = 3 WHERE id = 1001;
DELETE FROM students WHERE id = 1005;
SELECT d.name AS dept, AVG(s.gpa) AS avg_gpa
  FROM students s JOIN departments d ON d.id = s.dept_id GROUP BY d.name;