/* Schema for SQL database/table. We haven't discussed this type of file yet */
DROP DATABASE IF EXISTS humanResourcesDB;

/* Create database */
CREATE DATABASE humanResourcesDB;
USE humanResourcesDB;

/* Create new table with a primary key that auto-increments, and a text field */
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
  CONSTRAINT FK_RolesDepartment FOREIGN KEY (department_ID) 
  REFERENCES departments(id) 
);

CREATE TABLE employees (
  id INTEGER AUTO_INCREMENT NOT NULL ,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_ID INTEGER NOT NULL,
  manager_ID INTEGER NULL,
  PRIMARY KEY (id),
  CONSTRAINT FK_EmployeeRole FOREIGN KEY (role_ID) 
  REFERENCES roles(id),
  CONSTRAINT FK_EmployeeManager FOREIGN KEY (manager_ID) 
  REFERENCES employees(id)
);
