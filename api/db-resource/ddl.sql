-- SQL BY Levi for defining database schema 
-- ER diagram under docs->diagrams

BEGIN;

CREATE TABLE chapel_title (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title VARCHAR(255),
    weekday VARCHAR(15),
    chapel_time time with time zone,
    credits INTEGER
);

CREATE TABLE series (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(255),
    description TEXT,
    start_date DATE,
    end_date DATE
);

CREATE TABLE location (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    code CHAR(3) NOT NULL UNIQUE,
    address VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    state VARCHAR(255),
    country VARCHAR(255) NOT NULL
);

CREATE TABLE speakers (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    first_name VARCHAR(63),
    last_name VARCHAR(63),
    email VARCHAR(255),
    bio TEXT,
    brief TEXT,
    isfgu BOOLEAN
);

CREATE TABLE events (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title VARCHAR (255),
    description TEXT,
    date DATE,
    new_time BOOLEAN,
    event_time time with time zone,
    location_id BIGINT REFERENCES location(id),
    chapel_title_id BIGINT REFERENCES chapel_title(id),
    event_series_id BIGINT REFERENCES series(id)
);

CREATE TABLE event_speakers (
    event_id BIGINT,
    speaker_id BIGINT,
    PRIMARY KEY (event_id, speaker_id)
);
