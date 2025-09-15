-- Script SQL para base de datos ISO 9001 (MySQL)
-- Incluye autenticación de usuarios y módulos principales

CREATE DATABASE IF NOT EXISTS iso9001;
USE iso9001;

-- Tabla de usuarios
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    rol ENUM('admin','auditor','usuario') DEFAULT 'usuario',
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de procesos
CREATE TABLE procesos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    responsable_id INT,
    FOREIGN KEY (responsable_id) REFERENCES usuarios(id)
);

-- Tabla de auditorías
CREATE TABLE auditorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    proceso_id INT NOT NULL,
    fecha DATE NOT NULL,
    auditor_id INT,
    estado ENUM('pendiente','en_proceso','finalizada') DEFAULT 'pendiente',
    FOREIGN KEY (proceso_id) REFERENCES procesos(id),
    FOREIGN KEY (auditor_id) REFERENCES usuarios(id)
);

-- Tabla de hallazgos
CREATE TABLE hallazgos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    auditoria_id INT NOT NULL,
    descripcion TEXT NOT NULL,
    tipo ENUM('no_conformidad','observacion','mejora') NOT NULL,
    fecha DATE NOT NULL,
    FOREIGN KEY (auditoria_id) REFERENCES auditorias(id)
);

-- Tabla de acciones correctivas
CREATE TABLE acciones_correctivas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    hallazgo_id INT NOT NULL,
    descripcion TEXT NOT NULL,
    responsable_id INT,
    fecha_inicio DATE,
    fecha_fin DATE,
    estado ENUM('pendiente','en_proceso','cerrada') DEFAULT 'pendiente',
    FOREIGN KEY (hallazgo_id) REFERENCES hallazgos(id),
    FOREIGN KEY (responsable_id) REFERENCES usuarios(id)
);

-- Tabla de reportes (opcional, para guardar reportes generados)
CREATE TABLE reportes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    fecha DATE NOT NULL,
    contenido TEXT,
    creado_por INT,
    FOREIGN KEY (creado_por) REFERENCES usuarios(id)
);
