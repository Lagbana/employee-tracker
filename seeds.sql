/* Seeds for SQL table. We haven't discussed this type of file yet */
USE humanResourcesDB;

-- Department Names --
INSERT INTO departments (department_name)
VALUES ("Human Resources");

INSERT INTO departments (department_name)
VALUES ("Engineering");

INSERT INTO departments (department_name)
VALUES ("Finance");

INSERT INTO departments (department_name)
VALUES ("Marketing");

-- All Roles --
INSERT INTO roles (title, salary, department_ID)
VALUES ("manager", 100000, 1);

INSERT INTO roles (title, salary, department_ID)
VALUES ("manager", 150000, 2);

INSERT INTO roles (title, salary, department_ID)
VALUES ("manager", 140000, 3);

INSERT INTO roles (title, salary, department_ID)
VALUES ("manager", 150000, 4);

INSERT INTO roles (title, salary, department_ID)
VALUES ("front end developer", 80000, 2);

INSERT INTO roles (title, salary, department_ID)
VALUES ("back end developer", 80000, 2);

INSERT INTO roles (title, salary, department_ID)
VALUES ("test engineer", 70000, 2);

INSERT INTO roles (title, salary, department_ID)
VALUES ("financial analyst", 70000, 3);

INSERT INTO roles (title, salary, department_ID)
VALUES ("investment analyst", 80000, 3);

INSERT INTO roles (title, salary, department_ID)
VALUES ("marketing analyst", 65000, 4);

INSERT INTO roles (title, salary, department_ID)
VALUES ("content writer", 60000, 4);

INSERT INTO roles (title, salary, department_ID)
VALUES ("recruiter", 55000, 1);

INSERT INTO roles (title, salary, department_ID)
VALUES ("human resources assistant", 45000, 1);

INSERT INTO roles (title, salary, department_ID)
VALUES ("performance analyst", 60000, 1);

/* EMPLOYEES */
-- Human Resources Department Employees --
INSERT INTO employees (first_name, last_name, role_ID)
VALUES ("Saul", "Berenson", 1 );

INSERT INTO employees (first_name, last_name, role_ID, manager_ID)
VALUES ("Ian", "Morgan", 10, 1);

INSERT INTO employees (first_name, last_name, role_ID, manager_ID)
VALUES ("Tunde", "Ola", 11, 1);

INSERT INTO employees (first_name, last_name, role_ID, manager_ID)
VALUES ("Ian", "Morgan", 12, 1);

-- Engineering Department Employees --
INSERT INTO employees (first_name, last_name, role_ID)
VALUES ("Michael", "Scofield", 2 );

INSERT INTO employees (first_name, last_name, role_ID, manager_ID)
VALUES ("Henry", "Cho", 5, 2);

INSERT INTO employees (first_name, last_name, role_ID, manager_ID)
VALUES ("Carlos", "Tevez", 6, 2);

INSERT INTO employees (first_name, last_name, role_ID, manager_ID)
VALUES ("Didier", "Toure", 7, 2);

-- Finance Department Employees --
INSERT INTO employees (first_name, last_name, role_ID)
VALUES ("Bobby", "Axelrod", 3 );

INSERT INTO employees (first_name, last_name, role_ID, manager_ID)
VALUES ("Amina", "Abdulrahman", 8, 3);

INSERT INTO employees (first_name, last_name, role_ID, manager_ID)
VALUES ("Cindy", "Ho", 13, 3);

INSERT INTO employees (first_name, last_name, role_ID, manager_ID)
VALUES ("Amira", "Kaur", 14, 3);

-- Marketing Employees --
INSERT INTO employees (first_name, last_name, role_ID)
VALUES ("Don", "Draper", 4 );

INSERT INTO employees (first_name, last_name, role_ID, manager_ID)
VALUES ("Ben", "Taarabt", 9, 4);

-- Get Engineering Manager name
SELECT CONCAT(employees.first_name, " ", employees.last_name) AS "Manager"
FROM ((departments
LEFT JOIN roles ON departments.id = roles.department_ID)
LEFT JOIN employees ON roles.id = employees.role_ID)
WHERE roles.title = "Manager" AND departments.department_name = "Engineering";

-- Get Human Resources Manager name
SELECT CONCAT(employees.first_name, " ", employees.last_name) AS "Manager"
FROM ((departments
LEFT JOIN roles ON departments.id = roles.department_ID)
LEFT JOIN employees ON roles.id = employees.role_ID)
WHERE roles.title = "Manager" AND departments.department_name = "Human Resources";

-- Get Finance Manager name
SELECT CONCAT(employees.first_name, " ", employees.last_name) AS "Manager"
FROM ((departments
LEFT JOIN roles ON departments.id = roles.department_ID)
LEFT JOIN employees ON roles.id = employees.role_ID)
WHERE roles.title = "Manager" AND departments.department_name = "Finance";

-- Get Marketing Manager name
SELECT CONCAT(employees.first_name, " ", employees.last_name) AS "Manager"
FROM ((departments
LEFT JOIN roles ON departments.id = roles.department_ID)
LEFT JOIN employees ON roles.id = employees.role_ID)
WHERE roles.title = "Manager" AND departments.department_name = "Marketing";