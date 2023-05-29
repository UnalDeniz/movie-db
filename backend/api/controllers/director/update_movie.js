import client from '../../../loaders/db_loader.js';

export default async (req, res) => {
  const body = req.body;
  if (!body || !body.id || !body.name) {
    return res.status(400).json({ "resultMessage": "Please provide all required fields to update the movie." });
  }

  try {
    const db = await client();

    const checkMovieQuery = `SELECT director_username FROM Movie WHERE movie_id = ${body.id}`;

    const updateMovieQuery = `UPDATE Movie SET movie_name = '${body.name}' WHERE movie_id = ${body.id};`;

    db.query(checkMovieQuery, (err, data) => {

      if (err) {
        console.log(err);
        return res.status(500).json({ resultMessage: `An error occurred in the db query. Err: ${err.message}` });
      }

      if (!data['rows'][0]) {
        return res.status(404).json({ resultMessage: 'A director with the given username could not be find.' });
      } else {
        if (data.rows[0].director_username != req.userName) {
          return res.status(500).json({ resultMessage: "Only the director who have directed the move can change its name." });
        }
      }

      db.query(updateMovieQuery, (err, data) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ resultMessage: `An error occurred in the db query. Err: ${err.message}` });
        }
        return res.status(200).json({ resultMessage: "Movie is successfully updated." });
      });
    })

  } catch (err) {
    console.log(err);
    return res.status(500).json({ resultMessage: `An unexpected server error occurred. Err: ${err.message}` });
  }
};
