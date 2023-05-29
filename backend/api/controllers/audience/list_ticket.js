import client from '../../../loaders/db_loader.js';

export default async (req, res) => {
  try {

    const db = await client();

    const listTicketQuery = `
    SELECT M.movie_id, movie_name, S.session_id, average_rating AS overall_rating FROM Movie M, Session S, Buys_ticket B
    WHERE B.username = '${req.userName}' AND M.movie_id = S.movie_id AND B.session_id = S.session_id 
    ;`;

    db.query(listTicketQuery, async (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ resultMessage: `En error occured in the db query. Err: ${err.message}` });
      }
      // console.log(data);

      for (const row of data.rows) {
        let movie = row.movie_id
        let getRatingQuery = `
        SELECT rating FROM Rates R WHERE R.movie_id = ${movie} AND R.username = '${req.userName}';
        `;

        await new Promise((resolve, reject) => {

          db.query(getRatingQuery, (err, data) => {

            if (err) {
              console.log(err);
              return reject(err);
            }

            if (!data.rows[0]) {
              row.rating = null;
            } else {
              row.rating = data.rows[0].rating;
            }

            resolve();
          });
        })
      }

      return res.status(200).json({ resultMessage: `Tickets are successfully listed.`, Tickets: data.rows });

    })

  } catch (err) {

    return res.status(500).json({ resultMessage: `An unexpected server error occured. Err: ${err.message}` });

  }
}
