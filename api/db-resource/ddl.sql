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

CREATE TABLE speakers (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    first_name VARCHAR(63) NOT NULL,
    last_name VARCHAR(63) NOT NULL,
    email VARCHAR(255),
    bio TEXT,
    brief TEXT,
    isgfu BOOLEAN NOT NULL DEFAULT FALSE
);
-- Create an index to locate speakers by last name
CREATE INDEX idx_speaker_lName ON speakers(last_name);
CREATE INDEX idx_speaker_fName ON speakers(first_name);
-- Create an index to better find gfu speakers
CREATE INDEX idx_isgfu ON speakers(isgfu);

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
    speaker_id BIGINT NOT NULL,
    PRIMARY KEY (event_id, speaker_id),

    FOREIGN KEY (event_id) REFERENCES events(id) 
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (speaker_id) REFERENCES speakers(id) 
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX idx_eSpeaker_spId ON event_speakers(speaker_id);
