create database ServicioMecanico
go

CREATE TABLE Puestos (
    Id_puesto INT PRIMARY KEY,     -- Identificador único del puesto
    nom_puesto VARCHAR(100)        -- Nombre del puesto
);

CREATE TABLE Trabajadores (
    Id_trab INT PRIMARY KEY,                -- Identificador único del trabajador
    nom_tra VARCHAR(100),                   -- Nombre del trabajador
    apat_trab VARCHAR(100),                 -- Apellido paterno del trabajador
    amat_trab VARCHAR(100),                 -- Apellido materno del trabajador
    sex_trab CHAR(1),                       -- Sexo del trabajador (M/F)
    nom_puesto INT,                         -- Identificador del puesto (clave foránea)
    CONSTRAINT FK_Puesto FOREIGN KEY (nom_puesto) REFERENCES Puestos(Id_puesto) -- Clave foránea a la tabla Puestos
);

CREATE TABLE Stock (
    Id_stock INT PRIMARY KEY,
    nom_pieza VARCHAR(100),
    nom_parte VARCHAR(100),
    cant_stock INT
);

CREATE TABLE Proveedores (
    Id_prov INT PRIMARY KEY,
    nom_prov VARCHAR(100),
    tel_prov VARCHAR(15),
    correo_prov VARCHAR(100),
    stock_prov INT,
    FOREIGN KEY (stock_prov) REFERENCES Stock(Id_stock)
);

CREATE TABLE Fecha (
    id_fecha INT PRIMARY KEY,       -- Identificador único para la fecha
    fec_ent_veh DATE,               -- Fecha de entrada del vehículo
    fec_sal_veh DATE                -- Fecha de salida del vehículo
);

CREATE TABLE Aseguradoras (
    Id_aseg INT PRIMARY KEY,
    nom_aseg VARCHAR(100),
    tel_aseg VARCHAR(15),
    correo_aseg VARCHAR(100)
);

CREATE TABLE Status (
    id_status INT PRIMARY KEY,             -- Identificador único del estatus
    tipo_status VARCHAR(50),               -- Tipo de estatus (ej. "En reparación", "Disponible", etc.)
    fecha_status DATE,                     -- Fecha en la que se actualiza el estatus
    status_veh VARCHAR(50),                -- Descripción del estatus del vehículo
    prov_status INT,                       -- Identificador del proveedor relacionado (clave foránea)
    CONSTRAINT FK_Proveedor FOREIGN KEY (prov_status) REFERENCES Proveedores(Id_prov) -- Clave foránea a la tabla Proveedores
);

CREATE TABLE Vehiculos (
    Id_veh INT PRIMARY KEY,                 -- Identificador único del vehículo
    mod_veh VARCHAR(30),                   -- Modelo del vehículo
    marca_veh VARCHAR(30),                 -- Marca del vehículo
    año_veh INT,                            -- Año del vehículo
    peso_veh DECIMAL(10,2),                 -- Peso del vehículo
    color_veh VARCHAR(30),                  -- Color del vehículo
    fecha_ing INT,                          -- Identificador de fecha (clave foránea)
    status_veh INT,                         -- Identificador del estatus del vehículo (clave foránea)
    CONSTRAINT FK_Fecha FOREIGN KEY (fecha_ing) REFERENCES Fecha(id_fecha),   -- Clave foránea a la tabla Fecha
    CONSTRAINT FK_Status FOREIGN KEY (status_veh) REFERENCES Status(Id_status) -- Clave foránea a la tabla Status
);

CREATE TABLE Clientes (
    Id_cli INT PRIMARY KEY,                
    nom_cli VARCHAR(30),                  
    apat_cli VARCHAR(30),                 
    amat_cli VARCHAR(30),                 
    sex_cli CHAR(1),                      
    RFC_cli VARCHAR(15),                   
    veh_cli INT,                           
    aseg_cli INT,                          
    CONSTRAINT FK_Vehiculo FOREIGN KEY (veh_cli) REFERENCES Vehiculos(Id_veh),  
    CONSTRAINT FK_Aseguradora FOREIGN KEY (aseg_cli) REFERENCES Aseguradoras(Id_aseg) 
);

CREATE TABLE Reporte (
    id_rep INT PRIMARY KEY,
    trabajador_rep INT,
    cli_rep INT,
    aseg_rep INT,
    veh_rep INT,
    FOREIGN KEY (trabajador_rep) REFERENCES Trabajadores(Id_trab),
    FOREIGN KEY (cli_rep) REFERENCES Clientes(Id_cli),
    FOREIGN KEY (aseg_rep) REFERENCES Aseguradoras(Id_aseg),
    FOREIGN KEY (veh_rep) REFERENCES Vehiculos(Id_veh)
);

INSERT INTO Puestos (Id_puesto, nom_puesto) VALUES (1, 'Mecánico');
INSERT INTO Puestos (Id_puesto, nom_puesto) VALUES (2, 'Administrador');

INSERT INTO Trabajadores (Id_trab, nom_tra, apat_trab, amat_trab, 
sex_trab, nom_puesto) VALUES 
(1, 'Juan', 'Pérez', 'Gómez', 'M', 1),
(2, 'María', 'López', 'Sánchez', 'F', 2);

INSERT INTO Stock (Id_stock, nom_pieza, nom_parte, cant_stock) VALUES 
(3, 'Freno', 'Disco', 10),
(4, 'Aceite', 'Motor', 20);

INSERT INTO Proveedores (Id_prov, nom_prov, tel_prov, 
correo_prov, stock_prov) VALUES 
(1, 'Proveeduría A', '1234567890', 'contacto@proveeduriaA.com', 3),
(2, 'Proveeduría B', '0987654321', 'contacto@proveeduriaB.com', 4);

INSERT INTO Fecha (id_fecha, fec_ent_veh, fec_sal_veh) VALUES 
(1, '2023-09-01', '2023-09-10'),
(2, '2023-09-15', '2023-09-20');

INSERT INTO Aseguradoras (Id_aseg, nom_aseg, tel_aseg, correo_aseg) VALUES 
(1, 'Aseguradora A', '1112223333', 'info@aseguradoraA.com'),
(2, 'Aseguradora B', '4445556666', 'info@aseguradoraB.com');

INSERT INTO Status (id_status, tipo_status, fecha_status, status_veh, prov_status) VALUES 
(1, 'En reparación', '2023-09-05', 'Frenos dañados', 1),
(2, 'Disponible', '2023-09-10', 'Listo para usar', 2);

INSERT INTO Vehiculos (Id_veh, mod_veh, marca_veh, año_veh, peso_veh, color_veh, fecha_ing, status_veh) VALUES 
(1, 'Model X', 'Tesla', 2021, 2000.50, 'Rojo', 1, 1),
(2, 'Civic', 'Honda', 2020, 1500.00, 'Azul', 2, 2);

INSERT INTO Clientes (Id_cli, nom_cli, apat_cli, amat_cli, sex_cli, RFC_cli, veh_cli, aseg_cli) VALUES 
(1, 'Carlos', 'Torres', 'Martínez', 'M', 'TOMC800101', 1, 1),
(2, 'Laura', 'García', 'Rojas', 'F', 'GARL900202', 2, 2);

INSERT INTO Reporte (id_rep, trabajador_rep, cli_rep, aseg_rep, veh_rep) VALUES 
(1, 1, 1, 1, 1),
(2, 2, 2, 2, 2);

--Vista que muestre el cliente y el status de su vehiculo
CREATE VIEW VistaClienteStatus AS
SELECT 
    c.Id_cli AS ClienteID,
    c.nom_cli AS NombreCliente,
    c.apat_cli AS ApellidoPaterno,
    c.amat_cli AS ApellidoMaterno,
    v.mod_veh AS ModeloVehiculo,
    v.marca_veh AS MarcaVehiculo,
    s.tipo_status AS TipoStatus,
    s.fecha_status AS FechaStatus,
    s.status_veh AS DescripcionStatus
FROM 
    Clientes c
JOIN 
    Vehiculos v ON c.veh_cli = v.Id_veh
JOIN 
    Status s ON v.status_veh = s.id_status;


	SELECT * FROM VistaClienteStatus;

