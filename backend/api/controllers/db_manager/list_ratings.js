
import client from '../../../loaders/db_loader.js';

export default async (req, res) => {
  try {

    const db = await client();

    if (!req.query.username) {
      return res.status(400).json({ resultMessage: "Please provide the username of the audience." });
    }

    const listRatingsQuery = `
    SELECT M.movie_id, M.movie_name, R.rating 
    FROM Movie M, Rates R
    WHERE R.username = '${req.query.username}' AND R.movie_id = M.movie_id;
    `;

    db.query(listRatingsQuery, (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ resultMessage: `En error occured in the db query. Err: ${err.message}` });
      }

      return res.status(200).json({ resultMessage: `Ratings are successfully listed.`, Ratings: data.rows });
    })

  } catch (err) {

    return res.status(500).json({ resultMessage: `An unexpected server error occured. Err: ${err.message}` });

  }
}
