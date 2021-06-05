create database db_tickets;
use db_tickets;
create table CATEGORIAS
(
    ID INT NOT NULL auto_increment,
    Nombre varchar(50) NOT NULL,
    primary key(ID)
);

create table PERSONAL
(
    ID INT NOT NULL auto_increment,
    Nombre varchar(50) NOT NULL,
    Apellidos varchar(80) NOT NULL,
    Telefono varchar(10),
    Direccion varchar(100),
    primary key(ID)
);

create table TICKETS
(
    ID INT NOT NULL auto_increment,
    Nombre varchar(50) NOT NULL,
    Descripcion varchar(100),
    Prioridad varchar(1) NOT NULL,
    Estatus varchar(3) NOT NULL,
    Personal int NOT NULL,
    Categoria int NOT NULL,
    FOREIGN KEY (Personal) REFERENCES PERSONAL(ID),
    FOREIGN KEY (Categoria) REFERENCES CATEGORIAS(ID),
    primary key(ID)
);