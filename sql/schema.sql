
-- Create a schema if it doesn't exist
CREATE SCHEMA IF NOT EXISTS resident_management;
USE resident_management;



-- =============================================
-- Utilities
-- =============================================


/**
 * Table: provinces
 * Description: Stores information about provinces.
 * 
 * Columns:
 * - province_id: Unique identifier for each province.
 * - province_name: Name of the province (unique).
 * - region: Region where the province is located.
 * 
 * Indexes:
 * - uk_province_name: Ensures unique province names.
 * - idx_region: Improves query performance on region-based searches.
 */
CREATE TABLE IF NOT EXISTS provinces (
    province_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    province_name VARCHAR(255) NOT NULL,
    region VARCHAR(100),
    UNIQUE KEY uk_province_name (province_name),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_region (region)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/**
 * Table: municipalities
 * Description: Stores information about municipalities.
 * 
 * Columns:
 * - municipality_id: Unique identifier for each municipality.
 * - municipality_name: Name of the municipality.
 * - province_id: Foreign key referencing the provinces table.
 * - municipality_type: Type of municipality (City or Municipality).
 * 
 * Constraints:
 * - uk_municipality_name_province: Ensures unique combination of municipality name and province.
 * - fk_municipality_province: Foreign key relationship with provinces table.
 * 
 * Indexes:
 * - idx_municipality_type: Improves query performance on municipality type-based searches.
 */
CREATE TABLE IF NOT EXISTS municipalities (
    municipality_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    municipality_name VARCHAR(255) NOT NULL,
    province_id INT UNSIGNED NOT NULL,
    municipality_type ENUM('City', 'Municipality') NOT NULL DEFAULT 'Municipality',
    UNIQUE KEY uk_municipality_name_province (municipality_name, province_id),
    FOREIGN KEY fk_municipality_province (province_id) REFERENCES provinces(province_id) ON DELETE RESTRICT ON UPDATE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_municipality_type (municipality_type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/**
 * Table: barangays
 * Description: Stores information about barangays (smallest administrative division in the Philippines).
 * 
 * Columns:
 * - barangay_id: Unique identifier for each barangay.
 * - barangay_name: Name of the barangay.
 * - municipality_id: Foreign key referencing the municipalities table.
 * 
 * Constraints:
 * - uk_barangay_name_municipality: Ensures unique combination of barangay name and municipality.
 * - fk_barangay_municipality: Foreign key relationship with municipalities table.
 */
CREATE TABLE IF NOT EXISTS barangays (
    barangay_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    barangay_name VARCHAR(255) NOT NULL,
    municipality_id INT UNSIGNED NOT NULL,
    UNIQUE KEY uk_barangay_name_municipality (barangay_name, municipality_id),
    FOREIGN KEY fk_barangay_municipality (municipality_id) REFERENCES municipalities(municipality_id) ON DELETE RESTRICT ON UPDATE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/**
 * Table: streets
 * Description: Stores information about streets within barangays.
 * 
 * Columns:
 * - street_id: Unique identifier for each street.
 * - street_name: Name of the street.
 * - barangay_id: Foreign key referencing the barangays table.
 * - street_type: Type of street (e.g., Avenue, Street, Road).
 * 
 * Constraints:
 * - uk_street_name_barangay: Ensures unique combination of street name and barangay.
 * - fk_street_barangay: Foreign key relationship with barangays table.
 * 
 * Indexes:
 * - idx_street_type: Improves query performance on street type-based searches.
 */
CREATE TABLE IF NOT EXISTS streets (
    street_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    street_name VARCHAR(255) NOT NULL,
    barangay_id INT UNSIGNED NOT NULL,
    street_type ENUM('Avenue', 'Street', 'Road', 'Boulevard', 'Lane', 'Drive'),
    UNIQUE KEY uk_street_name_barangay (street_name, barangay_id),
    FOREIGN KEY fk_street_barangay (barangay_id) REFERENCES barangays(barangay_id) ON DELETE RESTRICT ON UPDATE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_street_type (street_type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/**
 * Table: occupations
 * Description: Stores occupation options for residents.
 * 
 * Columns:
 * - occupation_id: Unique identifier for each occupation.
 * - occupation_name: Name of the occupation (unique).
 */
CREATE TABLE IF NOT EXISTS occupations (
    occupation_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    occupation_name VARCHAR(255) NOT NULL,
    UNIQUE KEY uk_occupation_name (occupation_name),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/**
 * Table: nationalities
 * Description: Stores nationality options for residents.
 * 
 * Columns:
 * - nationality_id: Unique identifier for each nationality.
 * - nationality_name: Name of the nationality (unique).
 */
CREATE TABLE IF NOT EXISTS nationalities (
    nationality_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nationality_name VARCHAR(255) NOT NULL,
    UNIQUE KEY uk_nationality_name (nationality_name),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/**
 * Table: religions
 * Description: Stores religion options for residents.
 * 
 * Columns:
 * - religion_id: Unique identifier for each religion.
 * - religion_name: Name of the religion (unique).
 */
CREATE TABLE IF NOT EXISTS religions (
    religion_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    religion_name VARCHAR(255) NOT NULL,
    UNIQUE KEY uk_religion_name (religion_name),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/**
 * Table: benefits
 * Description: Stores information about benefits available to residents.
 * 
 * Columns:
 * - benefit_id: Unique identifier for each benefit.
 * - benefit_name: Name of the benefit (unique).
 */
CREATE TABLE IF NOT EXISTS benefits (
    benefit_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    benefit_name VARCHAR(255) NOT NULL,
    UNIQUE KEY uk_benefit_name (benefit_name),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;





-- =============================================
-- Residential Records
-- =============================================


/**
 * Table: residents
 * Description: Stores comprehensive information about residents.
 * 
 * Columns:
 * - resident_id: Unique identifier for each resident.
 * - full_name: Full name of the resident.
 * - first_name, last_name, middle_name: Individual name components.
 * - gender: Gender of the resident.
 * - image_base64, fingerprint_base64: Biometric data stored as base64 strings.
 * - date_of_birth: Resident's date of birth.
 * - civil_status: Marital status of the resident.
 * - occupation_id, nationality_id, religion_id, benefit_id: Foreign keys to respective tables.
 * - is_archived: Flag to indicate if the resident record is archived.
 * 
 * Constraints:
 * - Foreign key relationships with occupations, nationalities, religions, and benefits tables.
 * 
 * Indexes:
 * - idx_full_name, idx_date_of_birth, idx_civil_status: Improve query performance on these fields.
 */
CREATE TABLE IF NOT EXISTS residents (
    resident_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    middle_name VARCHAR(100),
    gender ENUM('Male', 'Female', 'Other') NOT NULL,
    image_base64 LONGTEXT NOT NULL,
    fingerprint_base64 LONGTEXT,
    date_of_birth DATE NOT NULL,
    civil_status ENUM('Single', 'Married', 'Divorced', 'Widowed') NOT NULL,
    occupation_id INT UNSIGNED,
    nationality_id INT UNSIGNED,
    religion_id INT UNSIGNED,
    benefit_id INT UNSIGNED,
    is_archived BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY fk_resident_occupation (occupation_id) REFERENCES occupations(occupation_id) ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY fk_resident_nationality (nationality_id) REFERENCES nationalities(nationality_id) ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY fk_resident_religion (religion_id) REFERENCES religions(religion_id) ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY fk_resident_benefit (benefit_id) REFERENCES benefits(benefit_id) ON DELETE SET NULL ON UPDATE CASCADE,
    INDEX idx_full_name (full_name),
    INDEX idx_date_of_birth (date_of_birth),
    INDEX idx_civil_status (civil_status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/**
 * Table: addresses
 * Description: Stores detailed address information for residents.
 * 
 * Columns:
 * - address_id: Unique identifier for each address.
 * - resident_id: Foreign key referencing the residents table.
 * - house_number: House number of the residence.
 * - street_id, barangay_id, municipality_id, province_id: Foreign keys to respective location tables.
 * - postal_code: Postal code of the address.
 * 
 * Constraints:
 * - Foreign key relationships with residents, streets, barangays, municipalities, and provinces tables.
 * 
 * Indexes:
 * - idx_postal_code: Improves query performance on postal code-based searches.
 */
CREATE TABLE IF NOT EXISTS addresses (
    address_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    resident_id BIGINT UNSIGNED NOT NULL,
    house_number VARCHAR(20) NOT NULL,
    street_id INT UNSIGNED,
    barangay_id INT UNSIGNED,
    municipality_id INT UNSIGNED,
    province_id INT UNSIGNED,
    postal_code VARCHAR(10),
    FOREIGN KEY fk_resident_id (resident_id) REFERENCES residents(resident_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY fk_address_street (street_id) REFERENCES streets(street_id) ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY fk_address_barangay (barangay_id) REFERENCES barangays(barangay_id) ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY fk_address_municipality (municipality_id) REFERENCES municipalities(municipality_id) ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY fk_address_province (province_id) REFERENCES provinces(province_id) ON DELETE RESTRICT ON UPDATE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_postal_code (postal_code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/**
 * Table: contacts
 * Description: Stores contact information for residents.
 * 
 * Columns:
 * - contact_id: Unique identifier for each contact entry.
 * - resident_id: Foreign key referencing the residents table.
 * - email: Email address of the resident.
 * - mobile: Mobile number of the resident.
 * 
 * Constraints:
 * - Foreign key relationship with residents table.
 */
CREATE TABLE IF NOT EXISTS contacts (
    contact_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    resident_id BIGINT UNSIGNED NOT NULL,
    email VARCHAR(255),
    mobile VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY fk_contact_resident (resident_id) REFERENCES residents(resident_id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/**
 * Table: documents
 * Description: Stores information about documents issued to residents.
 * 
 * Columns:
 * - document_id: Unique identifier for each document.
 * - document_title: Type of document issued.
 * - resident_id: Foreign key referencing the residents table.
 * - required_fields: JSON array storing required fields for the document.
 * - issued_by: Name of the person who issued the document.
 * - price: fee for processing the document
 * - issued_date: Date when the document was issued.
 * 
 * Constraints:
 * - Foreign key relationship with residents table.
 */
CREATE TABLE IF NOT EXISTS documents (
    document_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    document_title ENUM('Barangay Business Clearance', 'Barangay Clearance', 'Certificate of Indigency', 'Certificate of Residency') NOT NULL,
    resident_id BIGINT UNSIGNED NOT NULL,
    required_fields JSON NOT NULL,
    issued_by VARCHAR(255) NOT NULL,
    price INT UNSIGNED NOT NULL,
    issued_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY fk_issued_document_resident (resident_id) REFERENCES residents(resident_id) ON DELETE CASCADE ON UPDATE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/**
 * Table: incident_reports
 * Description: Stores basic information about incident reports.
 * 
 * Columns:
 * - case_number: Unique identifier for each incident report.
 * - title: Brief title or description of the incident.
 * - case_status: Current status of the case (Active, Closed, Resolved).
 * - created_at: Timestamp when the report was created.
 * - updated_at: Timestamp of the last update to the report.
 * 
 * Indexes:
 * - Primary key on case_number for efficient lookups.
 */
CREATE TABLE IF NOT EXISTS incident_reports (
    case_number BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    case_status ENUM('Active', 'Closed', 'Resolved') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/**
 * Table: incident_narratives
 * Description: Stores detailed narratives associated with incident reports.
 * 
 * Columns:
 * - narrative_id: Unique identifier for each narrative entry.
 * - case_number_id: Foreign key linking to the incident_reports table.
 * - narrative: Detailed text description of the incident.
 * - created_at: Timestamp when the narrative was created.
 * - updated_at: Timestamp of the last update to the narrative.
 * 
 * Constraints:
 * - Foreign key relationship with incident_reports table.
 * 
 * Indexes:
 * - Primary key on narrative_id for efficient lookups.
 */
CREATE TABLE IF NOT EXISTS incident_narratives (
    narrative_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    case_number_id BIGINT UNSIGNED NOT NULL,
    narrative TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY fk_incident_narrative_incident_report (case_number_id) REFERENCES incident_reports(case_number) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/**
 * Table: incident_participants
 * Description: Links residents to incident reports and defines their roles.
 * 
 * Columns:
 * - participant_id: Unique identifier for each participant entry.
 * - case_number_id: Foreign key linking to the incident_reports table.
 * - resident_id: Foreign key linking to the residents table.
 * - role: Role of the participant in the incident (Complainant or Offender).
 * - created_at: Timestamp when the participant entry was created.
 * - updated_at: Timestamp of the last update to the participant entry.
 * 
 * Constraints:
 * - Foreign key relationships with incident_reports and residents tables.
 * 
 * Indexes:
 * - Primary key on participant_id for efficient lookups.
 */
CREATE TABLE IF NOT EXISTS incident_participants (
    participant_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    case_number_id BIGINT UNSIGNED NOT NULL,
    resident_id BIGINT UNSIGNED NOT NULL,
    role ENUM('Complainant', 'Offender') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY fk_incident_participant_incident_report (case_number_id) REFERENCES incident_reports(case_number) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY fk_incident_participant_resident (resident_id) REFERENCES residents(resident_id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/**
 * Table: auth
 * Description: Stores authentication information for residents.
 * 
 * Columns:
 * - auth_id: Unique identifier for each authentication record.
 * - role: Role of the resident (admin, secretary, treasurer, volunteer).
 * - resident_id: Foreign key referencing the residents table.
 * - username: Username for the resident.
 * - password: Password for the resident.
 * 
 * Constraints:
 * - Foreign key relationship with residents table.
 */
CREATE TABLE IF NOT EXISTS auth (
    auth_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    role ENUM('admin', 'secretary', 'treasurer', 'volunteer') NOT NULL,
    resident_id BIGINT UNSIGNED NOT NULL,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    FOREIGN KEY fk_auth_resident (resident_id) REFERENCES residents(resident_id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;




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

-- Insert into occupations
INSERT INTO occupations (occupation_name)
VALUES ('N/A'), ('Engineer');

-- Insert into nationalities
INSERT INTO nationalities (nationality_name)
VALUES ('N/A'), ('Filipino');

-- Insert into religions
INSERT INTO religions (religion_name)
VALUES ('N/A'), ('Catholic');

-- Insert into benefits
INSERT INTO benefits (benefit_name)
VALUES ('N/A'), ('Health Insurance');

-- Insert into residents
INSERT INTO residents (full_name, first_name, last_name, middle_name, gender, image_base64, fingerprint_base64, date_of_birth, civil_status, occupation_id, nationality_id, religion_id, benefit_id, is_archived)
VALUES ('John Deniel Santos Dela Pena', 'John Deniel', 'Dela Pena', 'Santos', 'Male', 'base64encodedimage', 'base64encodedfingerprint', '2006-01-01', 'Single', 1, 1, 1, 1, FALSE);

-- Insert into addresses
INSERT INTO addresses (resident_id, house_number, street_id, barangay_id, municipality_id, province_id, postal_code)
VALUES (1, '123', 1, 1, 1, 1, '12345');

-- Insert into contacts
INSERT INTO contacts (resident_id, email, mobile)
VALUES (1, 'example@example.com', '1234567890');

-- Insert into documents
INSERT INTO documents (document_title, resident_id, required_fields, issued_by, price, issued_date) 
VALUES 
('Barangay Business Clearance', 1, '{"Business Name": "ABC Corp", "Address": "123 Main St"}', 'Secretary Kristina Marie Santos', 20, CURRENT_TIMESTAMP),
('Barangay Clearance', 1, '{"Purpose": "General Clearance", "Address": "456 Elm St"}', 'Secretary Kristina Marie Santos', 20, CURRENT_TIMESTAMP),
('Certificate of Indigency', 1, '{"Income": "Below Minimum Wage", "Dependents": "3"}', 'Secretary Kristina Marie Santos', 20, CURRENT_TIMESTAMP),
('Certificate of Residency', 1, '{"Years of Residency": "5", "Address": "789 Oak St"}', 'Secretary Kristina Marie Santos', 20, CURRENT_TIMESTAMP);

-- Insert into incident_reports
INSERT INTO incident_reports (title, case_status) VALUES
('Noise Complaint', 'Active'),
('Vandalism', 'Active');

-- Insert into incident_narratives
INSERT INTO incident_narratives (case_number_id, narrative) VALUES
(1, 'Resident reported loud music from a neighboring house at 11 PM. This was a recurring issue that had been reported previously. Several other residents in the vicinity also complained about the noise. The resident noted that the loud music was causing disturbance and affecting their sleep.'),
(1, 'Officer responded to the complaint at 11:30 PM. Upon arrival, the music was still audible from the street, confirming the resident’s report. The officer observed multiple residents visibly disturbed by the noise. The officer proceeded to approach the house to address the issue directly.'),
(1, 'The officer spoke with the neighbor who was playing the loud music. The neighbor initially seemed uncooperative but eventually agreed to lower the volume after understanding the impact on the community. The officer explained the noise ordinance and the importance of maintaining a peaceful environment.'),
(1, 'A follow-up check was conducted at 12:15 AM to ensure the noise issue was resolved. The officer patrolled the area and confirmed that the loud music had been turned down significantly, bringing relief to the affected residents. The situation appeared to be under control, with no further complaints.'),
(2, 'Graffiti was found on the public library wall early in the morning. The library staff discovered the vandalism and immediately reported it to the authorities. The graffiti included various symbols and tags, some of which were offensive. This incident marks the second occurrence of graffiti at the library in the past month.'),
(2, 'Photos were taken of the graffiti for documentation and evidence purposes. These images will be used to assist in identifying the vandals. The detailed photographs captured the extent of the damage, highlighting the need for a prompt cleanup. The library staff expressed concern over the increasing vandalism.'),
(2, 'A local cleaning crew was contacted to schedule the removal of the graffiti. The estimated cost for the cleanup was determined to be $500. The cleaning crew was chosen based on their expertise in removing graffiti without causing further damage to the property. The cleanup was scheduled to be completed within two days.'),
(2, 'Security camera footage was requested from the library staff to help identify potential suspects responsible for the graffiti. The footage will be reviewed by the authorities to gather evidence and possibly recognize any suspicious individuals or activities around the time the vandalism occurred.');

-- Insert into incident_participants (at least 10 entries)
INSERT INTO incident_participants (case_number_id, resident_id, role) VALUES
(1, 1, 'Complainant'),
(1, 1, 'Offender'),
(2, 1, 'Complainant'),
(2, 1, 'Offender'),
(1, 1, 'Complainant'),
(1, 1, 'Offender'),
(2, 1, 'Complainant'),
(2, 1, 'Offender'),
(1, 1, 'Complainant'),
(2, 1, 'Complainant');

-- Insert admin role
INSERT INTO auth (role, resident_id, username, password)
VALUES ('admin', 1, 'admin_user', 'hashed_password_here');

-- Insert secretary role
INSERT INTO auth (role, resident_id, username, password)
VALUES ('secretary', 1, 'secretary_user', 'hashed_password_here');

-- Insert treasurer role
INSERT INTO auth (role, resident_id, username, password)
VALUES ('treasurer', 1, 'treasurer_user', 'hashed_password_here');

-- Insert volunteer role
INSERT INTO auth (role, resident_id, username, password)
VALUES ('volunteer', 1, 'volunteer_user', 'hashed_password_here');
