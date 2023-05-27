
import client from '../../../loaders/db_loader.js';

export default async (req, res) => {
  const body = req.body;
  if (!body || !body.movie_id || !body.movie_name || !body.duration || !body.genres) {
    return res.status(400).json({ "resultMessage": "Please provide all required fields to create a movie." });
  }

  if (body.genres.length == 0) {
    return res.status(400).json({ "resultMessage": "Please add at least one genre." });
  }

  try {
    const db = await client();

    const addMovieQuery = `
      INSERT INTO Movie (movie_id, movie_name, duration, director_username)
      VALUES (${body.movie_id}, '${body.movie_name}', ${body.duration}, ${req.username});
    `;

    db.query(addMovieQuery, (err, data) => {
      if (err) {
        return res.status(500).json({ resultMessage: `An error occurred in the db query. Err: ${err.message}` });
      }

      let size = body.genres.length;

      for (let i = 0; i < size; i++) {
        let addGenreQuery = `
        INSERT INTO Has_Genre (movie_id, genre_id)
        VALUES (${body.movie_id}, ${body.genres[i]});
        `

        db.query(addGenreQuery, (err, data) => {
          if (err) {
            const revertMovieQuery = `
            DELETE FROM Movie WHERE movie_id = ${body.movie_id};
            `
            db.query(revertMovieQuery);

            return res.status(500).json({ resultMessage: `An error occurred in the db query. Err: ${err.message}` })
          } else {
            if (i == size - 1) {
              return res.status(200).json({ resultMessage: "Movie is succesfully added." });
            }
          }
        });
      }
    });
  } catch (err) {

    return res.status(500).json({ resultMessage: `An unexpected server error occurred. Err: ${err.message}` });

  }
};
