-- SQL BY Levi for defining database schema 
-- ER diagram under docs->diagrams

BEGIN;

CREATE TABLE chapel_title (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    weekday VARCHAR(15),
    chapel_time TIME,
    credits INTEGER NOT NULL DEFAULT 0
);
-- SELECT by chapel credits
CREATE INDEX idx_credits ON chapel_title(credits);
CREATE INDEX idx_chapel_time ON chapel_title(chapel_time);

CREATE TABLE series (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    start_date DATE,
    end_date DATE
);
-- Add index to better select series
CREATE INDEX idx_sDate ON series(start_date);
CREATE INDEX idx_eDate ON series(end_date);

CREATE TABLE location (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    code CHAR(3) NOT NULL UNIQUE,
    address VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    state VARCHAR(255),
    zip VARCHAR(63),
    country VARCHAR(255) NOT NULL
);
-- select locations by address
CREATE INDEX idx_addresses ON location (country, state, city, address);
CREATE INDEX idx_addresses_us ON location (zip, state, city, address);

CREATE TABLE people (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    first_name VARCHAR(63) NOT NULL,
    last_name VARCHAR(63) NOT NULL,
    email VARCHAR(255) DEFAULT NULL,
    bio TEXT DEFAULT NULL,
    brief TEXT DEFAULT NULL,
    is_gfu BOOLEAN NOT NULL DEFAULT FALSE
);
-- Create an index to locate speakers by last name
CREATE INDEX idx_people_lName ON people(last_name);
CREATE INDEX idx_people_fName ON people(first_name);
-- Create an index to better find gfu speakers
CREATE INDEX idx_isgfu ON people(is_gfu);

CREATE TABLE events (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    date DATE NOT NULL,
    -- for these we are to use coalesce
    new_time TIME DEFAULT NULL, -- if not null, there are is a new time
    new_credits INTEGER DEFAULT NULL, -- if not null, there is a different credit count

    location_id BIGINT REFERENCES location(id) 
        ON DELETE SET NULL ON UPDATE CASCADE,
    chapel_title_id BIGINT REFERENCES chapel_title(id) 
        ON DELETE SET NULL ON UPDATE CASCADE,
    event_series_id BIGINT REFERENCES series(id)
        ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE event_speakers (
    event_id BIGINT NOT NULL,
    person_id BIGINT NOT NULL,
    PRIMARY KEY (event_id, person_id),
    confirmed BOOLEAN,

    FOREIGN KEY (event_id) REFERENCES events(id) 
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (person_id) REFERENCES people(id) 
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE event_hosts (
    event_id BIGINT NOT NULL,
    person_id BIGINT NOT NULL,
    PRIMARY KEY (event_id, person_id),

    FOREIGN KEY (event_id) REFERENCES events(id) 
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (person_id) REFERENCES people(id) 
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX idx_eSpeaker_pId ON event_speakers(person_id);
CREATE INDEX idx_eHost_pId ON event_hosts(person_id);
