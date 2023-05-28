import client from '../../../loaders/db_loader.js';

export default async (req, res) => {
  try {

    const db = await client();

    if (!req.query.id) {
      return res.status(400).json({ resultMessage: "Please provide the id of the movie." });
    }

    const avgRatingQuery = `
    SELECT M.movie_id, M.movie_name, M.average_rating as overall_rating 
    FROM Movie M
    WHERE M.movie_id = '${req.query.id}';
    `;

    db.query(avgRatingQuery, (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ resultMessage: `En error occured in the db query. Err: ${err.message}` });
      }

      return res.status(200).json({ resultMessage: `Average rating is successfully listed.`, Ratings: data.rows });
    })

  } catch (err) {

    return res.status(500).json({ resultMessage: `An unexpected server error occured. Err: ${err.message}` });

  }
}
