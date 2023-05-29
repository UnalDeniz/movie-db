
import client from '../../../loaders/db_loader.js';

export default async (req, res) => {
  const body = req.body;
  if (!body || !body.movie_id || !body.rating) {
    return res.status(400).json({ "resultMessage": "Please provide all required fields to rate a movie." });
  }

  try {
    const db = await client();

    const rateMovieQuery = `
      INSERT INTO Rates (username, rating, movie_id)
      VALUES ('${req.userName}', ${body.rating}, ${body.movie_id}); 
    `;

    db.query(rateMovieQuery, (err, data) => {
      if (err) {
        return res.status(500).json({ resultMessage: `An error occurred in the db query. Err: ${err.message}` });
      } else {
        return res.status(200).json({ resultMessage: "Movie is succesfully rated." });
      }
    });
  } catch (err) {

    return res.status(500).json({ resultMessage: `An unexpected server error occurred. Err: ${err.message}` });

  }
};
