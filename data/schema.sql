DROP TABLE IF EXISTS student, student_laptop, laptops, student_scholarship, scholarships, programs, program_requirements, users, roles;

CREATE TABLE IF NOT EXISTS programs (
    id SERIAL,
    name VARCHAR(255),
    version VARCHAR,
    department VARCHAR(255),
    is_active BOOLEAN,
    PRIMARY KEY(name, version)
);


CREATE TABLE IF NOT EXISTS student (
    id SERIAL PRIMARY KEY, 
    name VARCHAR(255),
    nationality VARCHAR(255),
    national_id VARCHAR(255),
    student_status BOOLEAN,
    program_name VARCHAR(255),
    program_version VARCHAR(255),
    CONSTRAINT fk_program_name_and_version 
     FOREIGN KEY(program_name, program_version) 
     REFERENCES programs(name, version)
);


CREATE TABLE IF NOT EXISTS laptops (
    id SERIAL,
    serial_no VARCHAR(255) PRIMARY KEY,
    brand VARCHAR(255),
    cpu VARCHAR(255),
    ram VARCHAR(255),
    storage VARCHAR(255),
    storage_type VARCHAR(255),
    power_cable BOOLEAN,
    display_resolution VARCHAR(255),
    model VARCHAR(255),
    availability BOOLEAN
);

CREATE TABLE IF NOT EXISTS roles (
    id SERIAL,
    name VARCHAR(255) PRIMARY KEY,
    permission TEXT[]
);

INSERT INTO roles (name, permission) VALUES ('super-admin', ARRAY['read', 'create', 'update', 'delete','approve']);
INSERT INTO roles (name, permission) VALUES ('admin', ARRAY['read', 'create', 'update']);
INSERT INTO roles (name, permission) VALUES ('editor', ARRAY['read', 'update']);
INSERT INTO roles (name, permission) VALUES ('user', ARRAY['read']);

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE,
    role_name VARCHAR(255),
    password VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    name VARCHAR(255),
    is_accepted BOOLEAN DEFAULT false,
    CONSTRAINT fk_role_name
      FOREIGN KEY(role_name) 
	  REFERENCES roles (name)
);
INSERT INTO users (username, role_name, password, email, name, is_accepted) VALUES ('super-admin','super-admin','admin','admin','admin', true);


CREATE TABLE IF NOT EXISTS program_requirements (
    id SERIAL PRIMARY KEY,
    program_name VARCHAR(255),
    program_version VARCHAR(255),
    CONSTRAINT fk_program_name_and_version 
    FOREIGN KEY(program_name, program_version) 
    REFERENCES programs(name, version),
    cpu VARCHAR(255),
    ram VARCHAR(255),
    display_resolution VARCHAR(255),
    storage_space VARCHAR(255),
    storage_type VARCHAR(255)
);


CREATE TABLE IF NOT EXISTS student_laptop(
    id SERIAL,
    std_id INTEGER, 
    laptop_id VARCHAR(255),
    CONSTRAINT fk_laptop_id FOREIGN KEY (laptop_id) REFERENCES laptops (serial_no),
    availability BOOLEAN DEFAULT false
);

-- CREATE TABLE IF NOT EXISTS student_program (
--     student_id INTEGER,
--     scholar_id INTEGER,
--     CONSTRAINT fk_scholar_id FOREIGN KEY (scholar_id) REFERENCES scholarships (id),
--     CONSTRAINT fk_student_id FOREIGN KEY (student_id) REFERENCES student (id)
-- );
-- CREATE TABLE IF NOT EXISTS scholarships (
--     id SERIAL PRIMARY KEY,
--     scholarship_name VARCHAR(255),
--     program_name VARCHAR(255),
--     program_version VARCHAR(255),
--     CONSTRAINT fk_program_name_and_version 
--      FOREIGN KEY(program_name, program_version) 
--      REFERENCES programs(name, version),
--     covers_laptop BOOLEAN,
--     covers_transportation BOOLEAN,
--     keep_laptop_after_grad BOOLEAN
-- );


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
