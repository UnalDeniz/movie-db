import client from '../../../loaders/db_loader.js';

export default async (req, res) => {
  try {

    const db = await client();

    const listMovieQuery = `
    SELECT M.movie_id, movie_name, theatre_id, session_date, slot FROM Movie M, Plays P, Session S
    WHERE director_username = '${req.userName}' and M.movie_id = S.movie_id and P.session_id = S.session_id
    ORDER BY M.movie_id ASC;`;

    db.query(listMovieQuery, async (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ resultMessage: `En error occured in the db query. Err: ${err.message}` });
      }

      for (const row of data.rows) {
        // data.rows.forEach(row => {
        row.session_date = row.session_date.toLocaleString();
        let index = row.session_date.indexOf(',');
        row.session_date = row.session_date.substring(0, index);

        let listPredecessorQuery = `SELECT predecessor_id FROM Succeeds WHERE successor_id = ${row.movie_id};`;
        let predecessors = [];

        await new Promise((resolve, reject) => {

          db.query(listPredecessorQuery, (err, data2) => {

            if (err) {
              console.log(err);
              return reject(err);
            }

            data2.rows.forEach(row2 => {
              predecessors.push(row2.predecessor_id);
            });

            row.predecessors_list = predecessors.join(", ");
            resolve();
          });
        });
      };

      return res.status(200).json({ resultMessage: `Movies are successfully listed.`, Movies: data.rows });

    })

  } catch (err) {

    return res.status(500).json({ resultMessage: `An unexpected server error occured. Err: ${err.message}` });

  }
}
