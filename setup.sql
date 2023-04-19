CREATE TABLE IF NOT EXISTS patients (
    id VARCHAR(100) PRIMARY KEY,
    name VARCHAR(100),
    phone INT,
    birthDate DATE,
    address VARCHAR,
    appa VARCHAR
);

CREATE TABLE IF NOT EXISTS visits (
    id SERIAL PRIMARY KEY,
    patientId VARCHAR(100) REFERENCES patients(id),
    visitDate DATE,
    providedService VARCHAR,
    saleKey VARCHAR,
    paymentStatus VARCHAR,
    dischargeDate DATE
);

CREATE TABLE IF NOT EXISTS queue (
    id SERIAL PRIMARY KEY,
    visitId INT REFERENCES visits(id),
    queueDateId INT REFERENCES queue_dates(id)
);

CREATE TABLE IF NOT EXISTS queue_dates (
    id SERIAL PRIMARY KEY,
    date DATE
);

CREATE TABLE IF NOT EXISTS doctors (
    id SERIAL PRIMARY KEY,
    name VARCHAR,
    department VARCHAR
);


CREATE OR REPLACE PROCEDURE update_payment_status (sale_key VARCHAR)
AS
$$
BEGIN
    UPDATE visits
    SET paymentStatus = 'paid'
    WHERE saleKey = sale_key;
    COMMIT;
END;
$$
LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION get_patient_age (patient_id VARCHAR)
RETURNS INTEGER AS
$$
DECLARE
    birth_date DATE;
    age INTEGER;
BEGIN
    SELECT birthDate INTO birth_date FROM patients WHERE id = patient_id;
    age := DATE_PART('year', CURRENT_DATE) - DATE_PART('year', birth_date);
    IF (DATE_PART('month', CURRENT_DATE) < DATE_PART('month', birth_date) OR (DATE_PART('month', CURRENT_DATE) = DATE_PART('month', birth_date) AND DATE_PART('day', CURRENT_DATE) < DATE_PART('day', birth_date))) THEN
        age := age - 1;
    END IF;
    RETURN age;
END;
$$
LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION insert_queue_date()
RETURNS TRIGGER AS
$$
BEGIN
    INSERT INTO queue_dates (date)
    VALUES (NEW.date);
    RETURN NEW;
END;
$$
LANGUAGE plpgsql;

CREATE TRIGGER insert_queue_date_trigger
AFTER INSERT ON queue
FOR EACH ROW
EXECUTE FUNCTION insert_queue_date();
