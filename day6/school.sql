
-- Day 6: School Database Assignment

-- Enable foreign key enforcement in SQLite
PRAGMA foreign_keys = ON;

-- Remove existing tables so the script can be rerun safely
DROP TABLE IF EXISTS enrolments;
DROP TABLE IF EXISTS courses;
DROP TABLE IF EXISTS students;

-- 1. Create the students table
CREATE TABLE students (
    student_id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE
);

-- 2. Create the courses table
CREATE TABLE courses (
    course_id INTEGER PRIMARY KEY,
    course_name TEXT NOT NULL UNIQUE
);

-- 3. Create the enrolments table
CREATE TABLE enrolments (
    enrolment_id INTEGER PRIMARY KEY,
    student_id INTEGER NOT NULL,
    course_id INTEGER NOT NULL,
    grade TEXT,

    FOREIGN KEY (student_id) REFERENCES students(student_id),
    FOREIGN KEY (course_id) REFERENCES courses(course_id),

    UNIQUE (student_id, course_id)
);

-- Insert at least 3 students
INSERT INTO students (student_id, name, email) VALUES
(1, 'Amina Hassan', 'amina@example.com'),
(2, 'Brian Otieno', 'brian@example.com'),
(3, 'Carol Wanjiku', 'carol@example.com'),
(4, 'David Kamau', 'david@example.com');

-- Insert at least 3 courses
INSERT INTO courses (course_id, course_name) VALUES
(1, 'Database Systems'),
(2, 'Web Development'),
(3, 'Python Programming');

-- Insert at least 5 enrolments
INSERT INTO enrolments
    (enrolment_id, student_id, course_id, grade)
VALUES
(1, 1, 1, 'A'),
(2, 1, 2, 'B'),
(3, 2, 1, 'B'),
(4, 2, 3, 'A'),
(5, 3, 2, 'A');

-- Query 1: All courses taken by one student, searched by name
SELECT s.name, c.course_name, e.grade
FROM students AS s
JOIN enrolments AS e ON s.student_id = e.student_id
JOIN courses AS c ON e.course_id = c.course_id
WHERE s.name = 'Amina Hassan';

-- Query 2: All students enrolled in one course
SELECT c.course_name, s.name
FROM courses AS c
JOIN enrolments AS e ON c.course_id = e.course_id
JOIN students AS s ON e.student_id = s.student_id
WHERE c.course_name = 'Database Systems';

-- Query 3: Number of students per course, including courses with zero
SELECT c.course_name,
       COUNT(e.student_id) AS student_count
FROM courses AS c
LEFT JOIN enrolments AS e ON c.course_id = e.course_id
GROUP BY c.course_id, c.course_name
ORDER BY c.course_name;

-- Query 4: Students who have no enrolments
SELECT s.student_id, s.name, s.email
FROM students AS s
LEFT JOIN enrolments AS e ON s.student_id = e.student_id
WHERE e.student_id IS NULL;

-- Query 5: Update one enrolment's grade
UPDATE enrolments
SET grade = 'A'
WHERE student_id = 2 AND course_id = 1;

-- Display the updated enrolment to verify the change
SELECT s.name, c.course_name, e.grade
FROM enrolments AS e
JOIN students AS s ON e.student_id = s.student_id
JOIN courses AS c ON e.course_id = c.course_id
WHERE e.student_id = 2 AND e.course_id = 1;

-- Add an index to speed up searches for a student's enrolments
CREATE INDEX idx_enrolments_student_id
ON enrolments(student_id);
