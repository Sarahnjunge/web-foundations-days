
# School Database Design

## 1. Tables

### Students
The `students` table stores each student's ID, name, and email address. The student ID is the primary key, and the email is required and unique so that two students cannot register with the same email.

### Courses
The `courses` table stores each course's ID and name. The course ID is the primary key, and the course name is required and unique.

### Enrolments
The `enrolments` table records which student takes which course and the grade they receive. Its primary key is `enrolment_id`. The `student_id` and `course_id` columns are foreign keys referencing the students and courses tables. A composite UNIQUE constraint prevents duplicate enrolments for the same student and course.

## 2. Relationships

There is a one-to-many relationship between students and enrolments because one student can have multiple enrolment records, while each enrolment belongs to one student. There is also a one-to-many relationship between courses and enrolments because one course can have many enrolments, while each enrolment refers to one course.

Students and courses therefore have a many-to-many relationship: a student can take several courses, and a course can have several students. The `enrolments` table is necessary as a junction table to connect them. It also stores information about the relationship itself, such as the student's grade in a particular course.

## 3. Index

I would add an index on `enrolments(student_id)` to make it faster to find all enrolments belonging to a particular student. This is useful when displaying a student's courses or grades. The index uses additional storage and may slightly slow down inserts and updates.

## 4. SQL or NoSQL?

I would choose a relational SQL database for this school system. Students, courses, and enrolments have clear relationships, and foreign keys help maintain data integrity. Constraints can enforce unique emails and prevent duplicate enrolments. SQL joins and grouping also make it straightforward to retrieve course lists and calculate enrolment counts. A NoSQL database could be useful for flexible or rapidly changing records, but the structured relationships and consistency requirements of this system make SQL the better fit.
