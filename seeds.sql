/* Seeds for SQL table. We haven't discussed this type of file yet */
USE human_Resources_DB;

-- Create Departments --
INSERT INTO departments (department_name)
VALUES ("Human Resources");

INSERT INTO departments (department_name)
VALUES ("Engineering");

INSERT INTO departments (department_name)
VALUES ("Finance");

INSERT INTO departments (department_name)
VALUES ("Marketing");

INSERT INTO departments (department_name)
VALUES ("Sales");

-- Create Roles --
INSERT INTO roles (title, salary, department_ID)
VALUES ("HR Manager", 100000, 1);

INSERT INTO roles (title, salary, department_ID)
VALUES ("Engineering Manager", 150000, 2);

INSERT INTO roles (title, salary, department_ID)
VALUES ("Finance Manager", 140000, 3);

INSERT INTO roles (title, salary, department_ID)
VALUES ("Marketing Manager", 150000, 4);

INSERT INTO roles (title, salary, department_ID)
VALUES ("Front End Developer", 80000, 2);

INSERT INTO roles (title, salary, department_ID)
VALUES ("Back End Developer", 80000, 2);

INSERT INTO roles (title, salary, department_ID)
VALUES ("Test Engineer", 70000, 2);

INSERT INTO roles (title, salary, department_ID)
VALUES ("Financial Analyst", 70000, 3);

INSERT INTO roles (title, salary, department_ID)
VALUES ("Investment Analyst", 80000, 3);

INSERT INTO roles (title, salary, department_ID)
VALUES ("Marketing Analyst", 65000, 4);

INSERT INTO roles (title, salary, department_ID)
VALUES ("Content Writer", 60000, 4);

INSERT INTO roles (title, salary, department_ID)
VALUES ("Recruiter", 55000, 1);

INSERT INTO roles (title, salary, department_ID)
VALUES ("Human Resources Assistant", 45000, 1);

INSERT INTO roles (title, salary, department_ID)
VALUES ("Performance Analyst", 60000, 1);

INSERT INTO roles (title, salary, department_ID)
VALUES ("Sales Manager", 150000, 5);

INSERT INTO roles (title, salary, department_ID)
VALUES ("Sales Representative", 80000, 5);

/* EMPLOYEES */
-- Managers --
INSERT INTO employees (first_name, last_name, role_ID)
VALUES ("Saul", "Berenson", 1 );

INSERT INTO employees (first_name, last_name, role_ID)
VALUES ("Michael", "Scofield", 2 );

INSERT INTO employees (first_name, last_name, role_ID)
VALUES ("Bobby", "Axelrod", 3 );

INSERT INTO employees (first_name, last_name, role_ID)
VALUES ("Don", "Draper", 4 );

-- HR Team --
INSERT INTO employees (first_name, last_name, role_ID, manager_ID)
VALUES ("Ian", "Morgan", 12, 1);

INSERT INTO employees (first_name, last_name, role_ID, manager_ID)
VALUES ("Tunde", "Ola", 13, 1);

INSERT INTO employees (first_name, last_name, role_ID, manager_ID)
VALUES ("Ted", "Obama", 14, 1);

-- Engineering --

INSERT INTO employees (first_name, last_name, role_ID, manager_ID)
VALUES ("Henry", "Cho", 5, 2);

INSERT INTO employees (first_name, last_name, role_ID, manager_ID)
VALUES ("Carlos", "Tevez", 6, 2);

INSERT INTO employees (first_name, last_name, role_ID, manager_ID)
VALUES ("Didier", "Toure", 7, 2);

-- Finance --
INSERT INTO employees (first_name, last_name, role_ID, manager_ID)
VALUES ("Amina", "Abdulrahman", 8, 3);

INSERT INTO employees (first_name, last_name, role_ID, manager_ID)
VALUES ("Cindy", "Ho", 9, 3);

-- Marketing --
INSERT INTO employees (first_name, last_name, role_ID, manager_ID)
VALUES ("Amira", "Kaur", 10, 4);

INSERT INTO employees (first_name, last_name, role_ID, manager_ID)
VALUES ("Ben", "Taarabt", 11, 4);

-- Sales --
INSERT INTO employees (first_name, last_name, role_ID)
VALUES ("George", "Costanza", 15);

INSERT INTO employees (first_name, last_name, role_ID, manager_ID)
VALUES ("Cosmo", "Kramer", 16, 15);


-- View All --
SELECT * FROM joined_table;

-- View All by Department --
SELECT * FROM joined_table
ORDER BY Department ASC;

-- View All by Roles --
SELECT * FROM joined_table
ORDER BY Title ASC;

-- View All by Manager --
SELECT * FROM joined_table
ORDER BY Manager ASC;

-- Get department budget --
SELECT SUM(Salary) 
FROM joined_table
WHERE Department = "Sales";
