-- DROP TABLE IF EXISTS student_laptop, laptops, student_scholarship, scholarships, programs, program_requirement, user, roles, role_crud;

DROP TABLE IF EXISTS laptops, roles, users;
-- CREATE TABLE IF NOT EXISTS student_laptop(
--     std_id INTEGER, 
--     scholarship_id VARCHAR(255),
--     laptop_id VARCHAR(255),
--     CONSTRAINT fk_id FOREIGN KEY laptop_id REFERENCES laptops (id),
--     availability VARCHAR(255),
--     PRIMARY KEY (std_id, scholarship_id)
-- );

CREATE TABLE IF NOT EXISTS laptops (
    id VARCHAR(255),
    serial_no VARCHAR(255),
    brand VARCHAR(255),
    cpu VARCHAR(255),
    ram VARCHAR(255),
    storage VARCHAR(255),
    storage_type VARCHAR(255),
    carry_case BOOLEAN,
    external_mouse BOOLEAN,
    power_cable BOOLEAN,
    charger VARCHAR(255),
    display_resolution VARCHAR(255),
    model VARCHAR(255),
    availability BOOLEAN,
    PRIMARY KEY (id, serial_no)
);

CREATE TABLE IF NOT EXISTS roles (
    id SERIAL,
    name VARCHAR(255) PRIMARY KEY
    );

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255),
    role_name VARCHAR(255),
    password VARCHAR(255),
    email VARCHAR(255),
    name VARCHAR(255),
    CONSTRAINT fk_role_name
      FOREIGN KEY(role_name) 
	  REFERENCES roles (name)
);


-- CREATE TABLE IF NOT EXISTS student_scholarship (
--     student_id INTEGER,
--     scholar_id VARCHAR(255) PRIMARY KEY,
--     CONSTRAINT fk_id FOREIGN KEY student_id REFERENCES scholarships (id)
-- );

-- CREATE TABLE IF NOT EXISTS scholarships (
--     scholarship_name VARCHAR(255),
--     id INTEGER, 
--     CONSTRAINT id FOREIGN KEY program_id REFERENCES programs (program_id),
--     covers_laptop BOOLEAN,
--     covers_transportation BOOLEAN,
--     keep_laptop_after_grad BOOLEAN
-- );

-- CREATE TABLE IF NOT EXISTS programs (
--     program_name VARCHAR(255),
--     program_id VARCHAR(255) PRIMARY KEY,
--     program_version VARCHAR,
--     department VARCHAR(255)
-- );

-- CREATE TABLE IF NOT EXISTS program_requirements (
--     program_id INTEGER,
--     CONSTRAINT  program_id FOREIGN KEY program_id REFERENCES programs (program_id),
--     cpu VARCHAR(255),
--     ram VARCHAR(255),
--     display_resolution VARCHAR(255),
--     storage_space VARCHAR(255),
--     storage_type VARCHAR(255),
-- );

-- CREATE TABLE IF NOT EXISTS user (
--     id SERIAL,
--     username VARCHAR(255),
--     role VARCHAR(255),
--     CONSTRAINT role FOREIGN KEY role_id REFERENCES roles (role_id),
--     password VARCHAR(255),
--     email VARCHAR(255),
--     name VARCHAR(255)
-- );



-- CREATE TABLE IF NOT EXISTS role_crud (
--     role_id VARCHAR(255),
--     CONSTRAINT role_id FOREIGN KEY role_id REFERENCES roles (role_id),
--     crud_access VARCHAR(255)
-- );