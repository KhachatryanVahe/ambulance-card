CREATE TABLE IF NOT EXISTS patients (
    id VARCHAR(100),
    name VARCHAR(100),
    phone INT,
    birthDate DATE,
    address VARCHAR,
    appa VARCHAR
);


CREATE TABLE IF NOT EXISTS visits (
    id SERIAL PRIMARY KEY,
    patientId INT,
    visitDate DATE,
    department VARCHAR,
    doctorName VARCHAR,
    providedService VARCHAR,
    saleKey VARCHAR,
    paymentStatus VARCHAR,
    dischargeDate DATE
);


CREATE TABLE IF NOT EXISTS queue (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    date DATE,
    doctorName VARCHAR,
    department VARCHAR
);