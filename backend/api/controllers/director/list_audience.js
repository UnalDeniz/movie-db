
import client from '../../../loaders/db_loader.js';

export default async (req, res) => {
  try {

    const db = await client();

    if (!req.query.id) {
      return res.status(400).json({ resultMessage: "Please provide all required fields to list the audience" });
    }

    const checkMovieQuery = `
    SELECT movie_name FROM Movie M WHERE movie_id = ${req.query.id} AND director_username = '${req.userName}';
    `;
    const listAudienceQuery = `
    SELECT U.username, user_name AS name, user_surname AS surname FROM Users U, Movie M, Session S, Buys_ticket B
    WHERE M.movie_id = ${req.query.id} and M.movie_id = S.movie_id and B.session_id = S.session_id
    AND B.username = U.username;`;

    db.query(checkMovieQuery, (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ resultMessage: `En error occured in the db query. Err: ${err.message}` });
      }

      if (!data.rows[0]) {
        return res.status(500).json({ resultMessage: `You have no movie with the given id.` })
      }

      db.query(listAudienceQuery, (err, data) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ resultMessage: `En error occured in the db query. Err: ${err.message}` });
        }

        return res.status(200).json({ resultMessage: `Audience are successfully listed.`, Audience: data.rows });
      })
    })
  } catch (err) {

    return res.status(500).json({ resultMessage: `An unexpected server error occured. Err: ${err.message}` });

  }
}
