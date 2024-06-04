-- Create Database if Not Exists
CREATE DATABASE IF NOT EXISTS test;

-- Use the Created Database
USE test;

-- Create Users Table if Not Exists
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Insert Dummy Data if Not Exists
INSERT IGNORE INTO users (email, password) VALUES
('user1@example.com', 'password1'),
('user2@example.com', 'password2'),
('user3@example.com', 'password3');
