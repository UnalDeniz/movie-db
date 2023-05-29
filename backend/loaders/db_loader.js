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
  user_password CHAR (44) NOT NULL,
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
  slot INT NOT NULL CHECK (0 < slot AND slot < 5),
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
  duration INT NOT NULL CHECK (0 < duration AND duration < 5),
  average_rating FLOAT,
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
  user_password VARCHAR (44) NOT NULL,
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
  rating FLOAT NOT NULL CHECK (0 <= rating AND rating <= 5),
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
  session_id INT NOT NULL UNIQUE,
  FOREIGN KEY (session_id) REFERENCES Session (session_id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (theatre_id) REFERENCES Theatre (theatre_id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (session_date, slot) REFERENCES Times (session_date, slot) ON DELETE CASCADE ON UPDATE CASCADE,
  PRIMARY KEY (session_date, slot, theatre_id) 
);`;

//TODO add check triggers.
//
const checkDBCountQuery = `CREATE OR REPLACE FUNCTION check_db_count()
  RETURNS TRIGGER AS $$
BEGIN
  IF (SELECT COUNT(*) FROM Db_manager) >= 4 THEN
    RAISE EXCEPTION 'The maximum number of rows in the table "db_manager" has been reached.';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;`;

const triggerDBCountQuery = `CREATE OR REPLACE TRIGGER enforce_db_count
  BEFORE INSERT OR UPDATE ON Db_manager
  FOR EACH ROW
  EXECUTE FUNCTION check_db_count();`;

const checkTheatreCapacityQuery = `CREATE OR REPLACE FUNCTION check_capacity()
  RETURNS TRIGGER AS $$
BEGIN
  IF (SELECT COUNT(*) FROM Buys_Ticket B WHERE NEW.session_id = B.session_id) 
  >= (SELECT capacity FROM Plays P, Theatre T WHERE NEW.session_id = P.session_id 
  AND P.theatre_id = T.theatre_id) THEN
    RAISE EXCEPTION 'Theatre capacity for this session has been reached.';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;`;

const triggerTheatreCapacityQuery = `CREATE OR REPLACE TRIGGER enforce_capacity
  BEFORE INSERT OR UPDATE ON Buys_Ticket
  FOR EACH ROW
  EXECUTE FUNCTION check_capacity();`;

const checkMovieSlotQuery = `CREATE OR REPLACE FUNCTION check_movie_slots() 
RETURNS TRIGGER AS $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM Movie M1, Movie M2, Plays P, Session S1, Session S2 
        WHERE NEW.session_id = S1.session_id AND M1.movie_id = S1.movie_id 
        AND P.session_id = S2.session_id AND M2.movie_id = S2.movie_id 
        AND NEW.session_date = P.session_date AND NEW.theatre_id = P.theatre_id
        AND (NEW.slot BETWEEN P.slot AND P.slot + M2.duration - 1 
        OR P.slot BETWEEN NEW.slot AND NEW.slot + M1.duration - 1)
    ) THEN
        RAISE EXCEPTION 'Slots overlap for the same day.';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;`;

const triggerMovieSlotQuery = `CREATE OR REPLACE TRIGGER enforce_movie_slots
BEFORE INSERT OR UPDATE ON Plays
FOR EACH ROW
EXECUTE FUNCTION check_movie_slots();`;

const checkPredecessorQuery = `CREATE OR REPLACE FUNCTION check_predecessor() 
RETURNS TRIGGER AS $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM Succeeds S1, Session S2, Plays P1
        WHERE NEW.session_id = S2.session_id AND S2.movie_id = S1.successor_id 
        AND P1.session_id = S2.session_id AND S1.predecessor_id NOT IN 
        (SELECT movie_id FROM Buys_Ticket B, Plays P2, Session S3 WHERE S3.session_id = P2.session_id 
        AND NEW.username = B.username AND B.session_id = P2.session_id AND 
        (P2.session_date < P1.session_date OR (P2.session_date = P1.session_date AND P2.slot < P1.slot ))))
        THEN
        RAISE EXCEPTION 'There is a unwatched predecessor.';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;`;

const triggerPredecessorQuery = `CREATE OR REPLACE TRIGGER enforce_predecessor
BEFORE INSERT OR UPDATE ON Buys_Ticket
FOR EACH ROW
EXECUTE FUNCTION check_predecessor();`;

const updateAvgRating = `
CREATE OR REPLACE FUNCTION update_average_rating()
  RETURNS TRIGGER AS $$
BEGIN
  UPDATE Movie
  SET average_rating = (
    SELECT AVG(rating)
    FROM Rates
    WHERE movie_id = NEW.movie_id
  )
  WHERE movie_id = NEW.movie_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
`;

const triggerAvgRating = `
CREATE OR REPLACE TRIGGER calculate_average_rating
AFTER INSERT OR UPDATE OR DELETE ON Rates
FOR EACH ROW
EXECUTE FUNCTION update_average_rating();
`;

const checkSubQuery = `
CREATE OR REPLACE FUNCTION prevent_unsubbed_rating()
RETURNS TRIGGER AS $$
BEGIN
  -- Check if the audience has subscribed to the platform of the movie's director
  IF NOT EXISTS (
    SELECT 1
    FROM Subscribes S, Director D, Movie M
    WHERE S.platform_id = D.platform_id AND S.username = NEW.username 
    AND NEW.movie_id = M.movie_id AND M.director_username = D.username
  ) THEN
    RAISE EXCEPTION 'The audience has not subscribed to the platform of the movie''s director.';
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
`;

const triggerSubQuery = `
CREATE OR REPLACE TRIGGER check_unsubbed_rating
BEFORE INSERT ON Rates
FOR EACH ROW
EXECUTE FUNCTION prevent_unsubbed_rating();
`;

const checkRateQuery = `
CREATE OR REPLACE FUNCTION prevent_invalid_rating()
RETURNS TRIGGER AS $$
BEGIN
  -- Check if the audience has bought a ticket for the movie
  IF NOT EXISTS (
    SELECT 1
    FROM Buys_Ticket bt
    JOIN Session s ON NEW.movie_id = s.movie_id AND bt.session_id = s.session_id
    WHERE bt.username = NEW.username
  ) THEN
    RAISE EXCEPTION 'The audience has not bought a ticket for the movie.';
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
`;

const triggerRateQuery = `
CREATE OR REPLACE TRIGGER check_valid_rating
BEFORE INSERT ON Rates
FOR EACH ROW
EXECUTE FUNCTION prevent_invalid_rating();
`;

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
    await client.query(checkDBCountQuery);
    await client.query(triggerDBCountQuery);
    await client.query(checkMovieSlotQuery);
    await client.query(triggerMovieSlotQuery);
    await client.query(checkTheatreCapacityQuery);
    await client.query(triggerTheatreCapacityQuery);
    await client.query(checkPredecessorQuery);
    await client.query(triggerPredecessorQuery);
    await client.query(updateAvgRating);
    await client.query(triggerAvgRating);
    await client.query(checkSubQuery);
    await client.query(triggerSubQuery);
    await client.query(checkRateQuery);
    await client.query(triggerRateQuery);

    //TODO run check trigger queries.

    return client;
  } catch (err) {
    console.error("An error occurred while connecting to the database.");
  }
};
