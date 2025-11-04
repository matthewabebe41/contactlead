set client_min_messages to warning;

drop schema "public" cascade;

create schema "public";

CREATE DATABASE contactlead;

CREATE TABLE users(
user_id SERIAL PRIMARY KEY,
firstname VARCHAR(12),
lastname VARCHAR(12),
emailaddress VARCHAR(25),
phonenumber VARCHAR(13),
user_password VARCHAR(20),
user_image VARCHAR
);

CREATE TABLE user_images (
	user_id SERIAL PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
	mime_type VARCHAR(50) NOT NULL,
	data BYTEA NOT NULL
);

CREATE TABLE contacts(
user_id SERIAL,
contact_id SERIAL,
firstname VARCHAR(12),
lastname VARCHAR(12),
emailaddress VARCHAR(25),
phonenumber VARCHAR(13),
gender VARCHAR(6),
birthday VARCHAR(8),
contact_address VARCHAR(60),
organization VARCHAR(25),
organization_role VARCHAR(25),
social_media VARCHAR(60),
favorite BOOLEAN,
notes VARCHAR(300),
contact_image VARCHAR,
CONSTRAINT fk_user
      FOREIGN KEY(user_id)
        REFERENCES users(user_id)
);

CREATE TABLE contact_images (
	user_id SERIAL NOT NULL,
	contact_id SERIAL NOT NULL,
	name VARCHAR(255) NOT NULL,
	mime_type VARCHAR(50) NOT NULL,
	data BYTEA NOT NULL
);

CREATE TABLE groups(
user_id SERIAL, 
group_id SERIAL, 
groupname VARCHAR(30), 
CONSTRAINT fk_user 
	FOREIGN KEY(user_id) 
	REFERENCES users(user_id)
);

CREATE TABLE contactGroups(
user_id SERIAL,
contact_id SERIAL,
group_id SERIAL, 
groupname VARCHAR(30), 
CONSTRAINT fk_user 
	FOREIGN KEY(user_id) 
	REFERENCES users(user_id)
);