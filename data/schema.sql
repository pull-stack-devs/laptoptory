DROP TABLE IF EXISTS student, student_laptop, laptops, student_scholarship, scholarships, programs, program_requirements, users, roles;

CREATE TABLE IF NOT EXISTS student (
    id SERIAL PRIMARY KEY, 
    name VARCHAR(255),
    nationality VARCHAR(255),
    national_id VARCHAR(255),
    program VARCHAR(255),
    student_status BOOLEAN
);


CREATE TABLE IF NOT EXISTS laptops (
    id VARCHAR(255),
    serial_no VARCHAR(255) PRIMARY KEY,
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
    availability BOOLEAN
);

CREATE TABLE IF NOT EXISTS roles (
    id SERIAL,
    name VARCHAR(255) PRIMARY KEY,
    permission TEXT[]
);

INSERT INTO roles (name, permission) VALUES ('super-admin', ARRAY['read', 'create', 'update', 'delete']);
INSERT INTO roles (name, permission) VALUES ('admin', ARRAY['read', 'create', 'update']);
INSERT INTO roles (name, permission) VALUES ('editor', ARRAY['read', 'update']);
INSERT INTO roles (name, permission) VALUES ('user', ARRAY['read']);

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255),
    role_name VARCHAR(255),
    password VARCHAR(255),
    email VARCHAR(255),
    name VARCHAR(255),
    is_accepted BOOLEAN DEFAULT false,
    CONSTRAINT fk_role_name
      FOREIGN KEY(role_name) 
	  REFERENCES roles (name)
);
INSERT INTO users (username, role_name, password, email, name, is_accepted) VALUES ('super-admin','super-admin','admin','admin','admin', true);

-- CREATE TABLE IF NOT EXISTS role_crud (
--     role_id VARCHAR(255),
--     CONSTRAINT role_id FOREIGN KEY role_id REFERENCES roles (role_id),
--     crud_access VARCHAR(255)
-- );

CREATE TABLE IF NOT EXISTS programs (
    name VARCHAR(255),
    id VARCHAR(255) PRIMARY KEY,
    version VARCHAR,
    department VARCHAR(255),
    is_active BOOLEAN
);

CREATE TABLE IF NOT EXISTS scholarships (
    id SERIAL PRIMARY KEY,
    scholarship_name VARCHAR(255),
    program_id VARCHAR(255), 
    CONSTRAINT fk_program_id FOREIGN KEY (program_id) REFERENCES programs (id),
    covers_laptop BOOLEAN,
    covers_transportation BOOLEAN,
    keep_laptop_after_grad BOOLEAN
);

CREATE TABLE IF NOT EXISTS student_scholarship (
    student_id INTEGER,
    scholar_id INTEGER,
    CONSTRAINT fk_scholar_id FOREIGN KEY (scholar_id) REFERENCES scholarships (id),
    CONSTRAINT fk_student_id FOREIGN KEY (student_id) REFERENCES student (id)
);

CREATE TABLE IF NOT EXISTS program_requirements (
    program_id VARCHAR(255),
    CONSTRAINT fk_program_id 
     FOREIGN KEY(program_id) 
     REFERENCES programs(id),
    cpu VARCHAR(255),
    ram VARCHAR(255),
    display_resolution VARCHAR(255),
    storage_space VARCHAR(255),
    storage_type VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS student_laptop(
    std_id INTEGER, 
    scholarship_id VARCHAR(255),
    laptop_id VARCHAR(255),
    CONSTRAINT fk_laptop_id FOREIGN KEY (laptop_id) REFERENCES laptops (serial_no),
    availability VARCHAR(255)
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
