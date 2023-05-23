import pg from 'pg';
import { dbName, dbPort, host, password, user } from '../config.js';

const { Pool } = pg;

const dbConfig = {
  host: host,
  user: user,
  password: password,
  port: dbPort,
  database: dbName,
};

const usersTableQuery = `CREATE TABLE IF NOT EXISTS Users (	
  username VARCHAR (50) NOT NULL,
  user_name VARCHAR (50) NOT NULL,
  user_surname VARCHAR (50) NOT NULL,
  user_password VARCHAR (20) NOT NULL,
  PRIMARY KEY (username)
);`;

const platformTableQuery = `CREATE TABLE IF NOT EXISTS Platform (
	platform_name VARCHAR (50) NOT NULL UNIQUE,
  platform_id INT,
  PRIMARY KEY (platform_id)
);`;

const directorTableQuery = `CREATE TABLE IF NOT EXISTS Director (
	username VARCHAR(50),
	nation VARCHAR(50) NOT NULL,
  platform_id INT, 
  PRIMARY KEY (username),
	FOREIGN KEY (username) REFERENCES Users (username) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (platform_id) REFERENCES Platform (platform_id) ON DELETE SET NULL ON UPDATE CASCADE
);`;

const audienceTableQuery = `CREATE TABLE IF NOT EXISTS Audience (
	username VARCHAR(50),
	PRIMARY KEY (username),
	FOREIGN KEY (username) REFERENCES Users (username) ON DELETE CASCADE ON UPDATE CASCADE
);`;

const timesTableQuery = `CREATE TABLE IF NOT EXISTS Times (
	session_date Date NOT NULL,
  slot INT NOT NULL,
  PRIMARY KEY (session_date, slot)
);`;

const genreTableQuery = `CREATE TABLE IF NOT EXISTS Genre(
	genre_name VARCHAR (50) UNIQUE NOT NULL,
  genre_id INT,
  PRIMARY KEY (genre_id)
);`;

const movieTableQuery = `CREATE TABLE IF NOT EXISTS Movie (
	movie_id INT,
  movie_name VARCHAR (100) NOT NULL,
  duration INT NOT NULL,
  average_rating FLOAT,
  platform_id INT, 
  director_username VARCHAR(50) NOT NULL,
  PRIMARY KEY (movie_id),
  FOREIGN KEY (director_username) REFERENCES Director (username) ON DELETE CASCADE ON UPDATE CASCADE
);`;

const theatreTableQuery = `CREATE TABLE IF NOT EXISTS Theatre (
	theatre_id INT,
  theatre_name VARCHAR (100) NOT NULL,
  capacity INT NOT NULL,
  district VARCHAR (50) NOT NULL,
  PRIMARY KEY (theatre_id)
);`;

const sessionTableQuery = `CREATE TABLE IF NOT EXISTS Session (
	session_id INT,
  movie_id INT NOT NULL,
  PRIMARY KEY (session_id),
  FOREIGN KEY (movie_id) REFERENCES Movie (movie_id) ON DELETE CASCADE ON UPDATE CASCADE
);`;

const dbManagerTableQuery = `CREATE TABLE IF NOT EXISTS Db_manager(
	db_name VARCHAR (50),
  user_password VARCHAR (20) NOT NULL,
  PRIMARY KEY (db_name)
);`;

const subscribesTableQuery = `CREATE TABLE IF NOT EXISTS Subscribes (
	platform_id INT,
  username VARCHAR (50),
  FOREIGN KEY (username) REFERENCES Audience (username) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (platform_id) REFERENCES Platform (platform_id) ON DELETE CASCADE ON UPDATE CASCADE,
  PRIMARY KEY (username, platform_id)
);`;

const ratesTableQuery = `CREATE TABLE IF NOT EXISTS Rates (
	movie_id INT,
  username VARCHAR (50),
  rating FLOAT NOT NULL,
  FOREIGN KEY (username) REFERENCES Audience (username) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (movie_id) REFERENCES Movie (movie_id) ON DELETE CASCADE ON UPDATE CASCADE,
  PRIMARY KEY (username, movie_id)
);`;

const hasGenreTableQuery = `CREATE TABLE IF NOT EXISTS Has_Genre (
	movie_id INT,
  genre_id INT,
  FOREIGN KEY (movie_id) REFERENCES Movie (movie_id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (genre_id) REFERENCES Genre (genre_id) ON DELETE CASCADE ON UPDATE CASCADE,
  PRIMARY KEY (movie_id, genre_id)
);`;

const succeedsTableQuery = `CREATE TABLE IF NOT EXISTS Succeeds (
	predecessor_id INT,
  successor_id INT,
  FOREIGN KEY (predecessor_id) REFERENCES Movie (movie_id) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (successor_id) REFERENCES Movie (movie_id) ON DELETE CASCADE ON UPDATE CASCADE,
  PRIMARY KEY (predecessor_id, successor_id)
);`;

const buysTicketTableQuery = `CREATE TABLE IF NOT EXISTS Buys_Ticket (
	username VARCHAR (50),
  session_id INT,
  FOREIGN KEY (username) REFERENCES Audience (username) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (session_id) REFERENCES Session (session_id) ON DELETE CASCADE ON UPDATE CASCADE,
  PRIMARY KEY (session_id, username)
);`;

const playsTableQuery = `CREATE TABLE IF NOT EXISTS Plays(
	session_date Date NOT NULL,
  slot INT NOT NULL,
  theatre_id INT NOT NULL,
  session_id INT NOT NULL,
  FOREIGN KEY (session_id) REFERENCES Session (session_id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (theatre_id) REFERENCES Theatre (theatre_id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (session_date, slot) REFERENCES Times (session_date, slot) ON DELETE CASCADE ON UPDATE CASCADE,
  PRIMARY KEY (session_date, slot, theatre_id) 
);`;

//TODO add check triggers.

export default async () => {
  try {
    const client = new Pool(dbConfig);
    await client.query(usersTableQuery);
    await client.query(platformTableQuery);
    await client.query(directorTableQuery);
    await client.query(audienceTableQuery);
    await client.query(timesTableQuery);
    await client.query(genreTableQuery);
    await client.query(movieTableQuery);
    await client.query(theatreTableQuery);
    await client.query(sessionTableQuery);
    await client.query(dbManagerTableQuery);
    await client.query(subscribesTableQuery);
    await client.query(ratesTableQuery);
    await client.query(hasGenreTableQuery);
    await client.query(succeedsTableQuery);
    await client.query(buysTicketTableQuery);
    await client.query(playsTableQuery);

    //TODO run check trigger queries.

    return client;
  } catch (err) {
    console.error("An error occurred while connecting to the database.");
  }
};
