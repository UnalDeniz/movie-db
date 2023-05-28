import client from '../../../loaders/db_loader.js';

export default async (req, res) => {
  try {

    const db = await client();

    const listMovieQuery = `
    SELECT M.movie_id, movie_name, P.theatre_id, district, session_date, slot FROM Movie M, Plays P, Session S, Theatre T
    WHERE director_username = '${req.query.username}' AND M.movie_id = S.movie_id AND P.session_id = S.session_id 
    AND T.theatre_id = P.theatre_id;`;

    db.query(listMovieQuery, (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ resultMessage: `En error occured in the db query. Err: ${err.message}` });
      }

      for (const row of data.rows) {
        row.session_date = row.session_date.toLocaleString();
        let index = row.session_date.indexOf(',');
        row.session_date = row.session_date.substring(0, index);
      };

      return res.status(200).json({ resultMessage: `Movies are successfully listed.`, Movies: data.rows });

    })

  } catch (err) {

    return res.status(500).json({ resultMessage: `An unexpected server error occured. Err: ${err.message}` });

  }
}
