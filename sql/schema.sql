-- Create a schema if it doesn't exist
CREATE SCHEMA IF NOT EXISTS resident_management;
USE resident_management;

-- =============================================
-- Table structure for provinces
-- =============================================
CREATE TABLE IF NOT EXISTS provinces (
    province_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    province_name VARCHAR(255) NOT NULL COMMENT 'Name of the province',
    region VARCHAR(100) COMMENT 'Region of the province',
    UNIQUE KEY uk_province_name (province_name),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_region (region)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Stores information about provinces';

-- =============================================
-- Table structure for municipalities
-- =============================================
CREATE TABLE IF NOT EXISTS municipalities (
    municipality_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    municipality_name VARCHAR(255) NOT NULL COMMENT 'Name of the municipality',
    province_id INT UNSIGNED NOT NULL COMMENT 'ID of the associated province',
    municipality_type ENUM('City', 'Municipality') NOT NULL DEFAULT 'Municipality' COMMENT 'Type of municipality',
    UNIQUE KEY uk_municipality_name_province (municipality_name, province_id),
    FOREIGN KEY fk_municipality_province (province_id) REFERENCES provinces(province_id) ON DELETE RESTRICT ON UPDATE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_municipality_type (municipality_type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Stores information about municipalities';

-- =============================================
-- Table structure for barangays
-- =============================================
CREATE TABLE IF NOT EXISTS barangays (
    barangay_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    barangay_name VARCHAR(255) NOT NULL COMMENT 'Name of the barangay',
    municipality_id INT UNSIGNED NOT NULL COMMENT 'ID of the associated municipality',
    UNIQUE KEY uk_barangay_name_municipality (barangay_name, municipality_id),
    FOREIGN KEY fk_barangay_municipality (municipality_id) REFERENCES municipalities(municipality_id) ON DELETE RESTRICT ON UPDATE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Stores information about barangays';

-- =============================================
-- Table structure for streets
-- =============================================
CREATE TABLE IF NOT EXISTS streets (
    street_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    street_name VARCHAR(255) NOT NULL COMMENT 'Name of the street',
    barangay_id INT UNSIGNED NOT NULL COMMENT 'ID of the associated barangay',
    street_type ENUM('Avenue', 'Street', 'Road', 'Boulevard', 'Lane', 'Drive') COMMENT 'Type of street',
    UNIQUE KEY uk_street_name_barangay (street_name, barangay_id),
    FOREIGN KEY fk_street_barangay (barangay_id) REFERENCES barangays(barangay_id) ON DELETE RESTRICT ON UPDATE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_street_type (street_type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Stores information about streets';

-- =============================================
-- Table structure for house numbers
-- =============================================
CREATE TABLE IF NOT EXISTS house_numbers (
    house_number_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    house_number VARCHAR(20) NOT NULL COMMENT 'House number',
    street_id INT UNSIGNED NOT NULL COMMENT 'ID of the associated street',
    UNIQUE KEY uk_house_number_street (house_number, street_id),
    FOREIGN KEY fk_house_number_street (street_id) REFERENCES streets(street_id) ON DELETE RESTRICT ON UPDATE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Stores information about house numbers';

-- =============================================
-- Table structure for addresses
-- =============================================
CREATE TABLE IF NOT EXISTS addresses (
    address_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    house_number_id INT UNSIGNED COMMENT 'ID of the house number',
    street_id INT UNSIGNED COMMENT 'ID of the street',
    barangay_id INT UNSIGNED COMMENT 'ID of the barangay',
    municipality_id INT UNSIGNED COMMENT 'ID of the municipality',
    province_id INT UNSIGNED COMMENT 'ID of the province',
    postal_code VARCHAR(10) COMMENT 'Postal code of the address',
    FOREIGN KEY fk_address_house_number (house_number_id) REFERENCES house_numbers(house_number_id) ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY fk_address_street (street_id) REFERENCES streets(street_id) ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY fk_address_barangay (barangay_id) REFERENCES barangays(barangay_id) ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY fk_address_municipality (municipality_id) REFERENCES municipalities(municipality_id) ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY fk_address_province (province_id) REFERENCES provinces(province_id) ON DELETE SET NULL ON UPDATE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_postal_code (postal_code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Stores detailed addresses';

-- =============================================
-- Table structure for contacts
-- =============================================
CREATE TABLE IF NOT EXISTS contacts (
    contact_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) COMMENT 'Email address',
    mobile VARCHAR(20) COMMENT 'Mobile number',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Stores contact information';

-- =============================================
-- Table structure for occupations
-- =============================================
CREATE TABLE IF NOT EXISTS occupations (
    occupation_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    occupation_name VARCHAR(255) NOT NULL COMMENT 'Name of the occupation',
    UNIQUE KEY uk_occupation_name (occupation_name),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Stores occupation options';

-- =============================================
-- Table structure for nationalities
-- =============================================
CREATE TABLE IF NOT EXISTS nationalities (
    nationality_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nationality_name VARCHAR(255) NOT NULL COMMENT 'Name of the nationality',
    UNIQUE KEY uk_nationality_name (nationality_name),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Stores nationality options';

-- =============================================
-- Table structure for religions
-- =============================================
CREATE TABLE IF NOT EXISTS religions (
    religion_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    religion_name VARCHAR(255) NOT NULL COMMENT 'Name of the religion',
    UNIQUE KEY uk_religion_name (religion_name),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Stores religion options';

-- =============================================
-- Table structure for benefits
-- =============================================
CREATE TABLE IF NOT EXISTS benefits (
    benefit_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    benefit_name VARCHAR(255) NOT NULL COMMENT 'Name of the benefit',
    UNIQUE KEY uk_benefit_name (benefit_name),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Stores benefits information';

-- =============================================
-- Table structure for residents
-- =============================================
CREATE TABLE IF NOT EXISTS residents (
    resident_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL COMMENT 'Full name of the resident',
    first_name VARCHAR(100) NOT NULL COMMENT 'First name',
    last_name VARCHAR(100) NOT NULL COMMENT 'Last name',
    middle_name VARCHAR(100) COMMENT 'Middle name',
    gender ENUM('Male', 'Female', 'Other') NOT NULL COMMENT 'Gender of the resident',
    image_base64 MEDIUMBLOB COMMENT 'Resident\'s image',
    fingerprint_base64 MEDIUMBLOB COMMENT 'Resident\'s fingerprint',
    date_of_birth DATE NOT NULL COMMENT 'Date of birth',
    civil_status ENUM('Single', 'Married', 'Divorced', 'Widowed') COMMENT 'Civil status of the resident',
    barangay_status ENUM('In', 'Out') COMMENT 'Barangay status of the resident',
    address_id BIGINT UNSIGNED COMMENT 'ID of the address',
    contact_id BIGINT UNSIGNED COMMENT 'ID of the contact',
    occupation_id INT UNSIGNED COMMENT 'ID of the occupation',
    nationality_id INT UNSIGNED COMMENT 'ID of the nationality',
    religion_id INT UNSIGNED COMMENT 'ID of the religion',
    benefit_id INT UNSIGNED COMMENT 'ID of the benefit',
    is_archived BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY fk_resident_address (address_id) REFERENCES addresses(address_id) ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY fk_resident_contact (contact_id) REFERENCES contacts(contact_id) ON DELETE SET NULL ON UPDATE CASCADE,    
    FOREIGN KEY fk_resident_occupation (occupation_id) REFERENCES occupations(occupation_id) ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY fk_resident_nationality (nationality_id) REFERENCES nationalities(nationality_id) ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY fk_resident_religion (religion_id) REFERENCES religions(religion_id) ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY fk_resident_benefit (benefit_id) REFERENCES benefits(benefit_id) ON DELETE SET NULL ON UPDATE CASCADE,
    INDEX idx_full_name (full_name),
    INDEX idx_date_of_birth (date_of_birth),
    INDEX idx_civil_status (civil_status),
    INDEX idx_is_archived (is_archived)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Stores information about residents';

-- =============================================
-- Table structure for document types
-- =============================================
CREATE TABLE IF NOT EXISTS documents (
    document_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL COMMENT 'Title of the document',
    required_fields JSON COMMENT 'JSON array of required fields for the document',
    UNIQUE KEY uk_document_title (title),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Stores types of documents';

-- =============================================
-- Table structure for issued documents
-- =============================================
CREATE TABLE IF NOT EXISTS issued_documents (
    issued_document_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    document_id INT UNSIGNED NOT NULL COMMENT 'ID of the document type',
    resident_id BIGINT UNSIGNED NOT NULL COMMENT 'ID of the resident',
    issued_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Date of issuance',
    issued_by VARCHAR(255) COMMENT 'Name of the person who issued the document',
    FOREIGN KEY fk_issued_document_type (document_id) REFERENCES documents(document_id) ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY fk_issued_document_resident (resident_id) REFERENCES residents(resident_id) ON DELETE RESTRICT ON UPDATE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_issued_date (issued_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Stores information about issued documents';

-- =============================================
-- Table structure for user roles
-- =============================================
CREATE TABLE IF NOT EXISTS roles (
    role_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    role_name VARCHAR(255) NOT NULL COMMENT 'Name of the role (e.g., admin, user)',
    UNIQUE KEY uk_role_name (role_name),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Stores user roles';

-- =============================================
-- Table structure for user authentication
-- =============================================
CREATE TABLE IF NOT EXISTS auth (
    user_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL COMMENT 'Username for authentication',
    password VARCHAR(255) NOT NULL COMMENT 'Hashed password for authentication',
    role_id INT UNSIGNED NOT NULL COMMENT 'ID of the role',
    fingerprint_base64 MEDIUMBLOB COMMENT 'User fingerprint data',
    UNIQUE KEY uk_username (username),
    FOREIGN KEY fk_auth_role (role_id) REFERENCES roles(role_id) ON DELETE RESTRICT ON UPDATE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Stores user authentication information';

-- =============================================
-- Insert dummy data
-- ============================================= 

-- Insert into provinces
INSERT INTO provinces (province_name, region)
VALUES ('Bulacan', 'Central Luzon');

-- Insert into municipalities
INSERT INTO municipalities (municipality_name, province_id, municipality_type) VALUES 
('Bulakan', 1, 'Municipality'),
('Malolos', 1, 'City');

-- Insert into barangays
INSERT INTO barangays (barangay_name, municipality_id)
VALUES ('Bambang', 1);

-- Insert into streets
INSERT INTO streets (street_name, barangay_id, street_type) VALUES
('Purok 1', 1, 'Street'),
('Purok 2', 1, 'Street'),
('Purok 3', 1, 'Street'),
('Purok 4', 1, 'Street'),
('Purok 5', 1, 'Street'),
('Purok 6', 1, 'Drive');

-- Insert into house_numbers
INSERT INTO house_numbers (house_number, street_id)
VALUES ('123', 1);

-- Insert into addresses
INSERT INTO addresses (house_number_id, street_id, barangay_id, municipality_id, province_id, postal_code)
VALUES (1, 1, 1, 1, 1, '12345');

-- Insert into contacts
INSERT INTO contacts (email, mobile)
VALUES ('example@example.com', '1234567890');

-- Insert into occupations
INSERT INTO occupations (occupation_name)
VALUES ('Engineer');

-- Insert into nationalities
INSERT INTO nationalities (nationality_name)
VALUES ('Filipino');

-- Insert into religions
INSERT INTO religions (religion_name)
VALUES ('Catholic');

-- Insert into benefits
INSERT INTO benefits (benefit_name)
VALUES ('Health Insurance');

-- Insert into residents
INSERT INTO residents (full_name, first_name, last_name, middle_name, gender, image_base64, fingerprint_base64, date_of_birth, civil_status, barangay_status, address_id, contact_id, occupation_id, nationality_id, religion_id, benefit_id, is_archived)
VALUES ('John Doe', 'John', 'Doe', 'Middle', 'Male', 'base64encodedimage', 'base64encodedfingerprint', '1990-01-01', 'Single', 'In', 1, 1, 1, 1, 1, 1, FALSE);

-- Insert into documents
INSERT INTO documents (title, required_fields)
VALUES ('Birth Certificate', '["Name", "Date of Birth", "Place of Birth"]');

-- Insert into issued_documents
INSERT INTO issued_documents (document_id, resident_id, issued_date, issued_by)
VALUES (1, 1, CURRENT_TIMESTAMP, 'Admin');

-- Insert into roles
INSERT INTO roles (role_name)
VALUES ('Admin');

-- Insert into auth
INSERT INTO auth (username, password, role_id, fingerprint_base64)
VALUES ('admin', 'hashedpassword', 1, 'base64encodedfingerprint');
