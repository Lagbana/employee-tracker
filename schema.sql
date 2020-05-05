-- Create database --
DROP DATABASE IF EXISTS  human_Resources_DB;
CREATE DATABASE human_Resources_DB;

USE human_Resources_DB;

-- Create 3 main tables --
CREATE TABLE departments (
  id INTEGER AUTO_INCREMENT NOT NULL ,
  department_name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE roles (
  id INTEGER AUTO_INCREMENT NOT NULL ,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10, 2) NOT NULL,
  department_ID INTEGER NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (department_ID) REFERENCES departments(id) ON DELETE CASCADE
);

CREATE TABLE employees (
  id INTEGER AUTO_INCREMENT NOT NULL ,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_ID INTEGER NOT NULL,
  manager_ID INTEGER NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (role_ID) REFERENCES roles(id) ON DELETE CASCADE,
  FOREIGN KEY (manager_ID) REFERENCES employees(id) ON DELETE CASCADE
);

-- Create / Update Table Logic  --
-- ! Only run this query after creating the other tables
-- Join Tables --

DROP TABLE IF EXISTS joined_table;

CREATE TABLE joined_table 
SELECT employees.id AS ID, employees.first_name AS First_Name, employees.last_name AS Last_Name, 
employees.manager_ID AS Manager_ID, roles.title AS Title, roles.salary AS Salary, departments.department_name AS Department
FROM ((departments
LEFT JOIN roles ON departments.id = roles.department_ID)
LEFT JOIN employees ON roles.id = employees.role_ID )
WHERE employees.id IS NOT NULL AND roles.title IS NOT NULL AND departments.department_name IS NOT NULL
ORDER BY ID ASC;

ALTER TABLE joined_table 
ADD Manager VARCHAR (30) NULL;


UPDATE joined_table, 
(
    SELECT ID, First_Name, Last_Name
    FROM joined_table 
    WHERE title LIKE '%Manager'
) as temp
SET Manager = CONCAT(temp.First_Name, " ", temp.Last_Name) WHERE joined_table.Manager_ID = temp.ID AND Manager_ID is not NULL;
