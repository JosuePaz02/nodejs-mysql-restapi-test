create database if no exists companydb;

use companydb;

create table employees (
    id int(11) primary key AUTO_INCREMENT,
    names varchar(45),
    salary int(5)
);

insert into employees values 
(1, 'josue', 8000),
(2, 'fernando', 8000),
(3, 'angel', 8000),
(4, 'luis', 8000);