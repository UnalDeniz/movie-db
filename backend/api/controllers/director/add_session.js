import client from '../../../loaders/db_loader.js';

export default async (req, res) => {
  const body = req.body;
  if (!body || !body.session_id || !body.movie_id || !body.theatre_id || !body.slot || !body.date) {
    return res.status(400).json({ "resultMessage": "Please provide all required fields to create a session." });
  }

  try {
    const db = await client();

    const checkDirectorQuery = `
    SELECT 1 FROM Movie WHERE director_username = '${req.userName}' AND movie_id = ${body.movie_id};
    `;

    const addSessionQuery = `
      INSERT INTO Session (session_id, movie_id)
      VALUES (${body.session_id}, ${body.movie_id}); 
    `;

    db.query(checkDirectorQuery, (err, data) => {
      if (err) {
        return res.status(500).json({ resultMessage: `An error occurred in the db query. Err: ${err.message}` });
      }

      if (!data.rows[0]) {
        return res.status(500).json({ resultMessage: "The movie that you are trying to add a session to does not belong to you." })
      }

      db.query(addSessionQuery, (err, data) => {
        if (err) {
          return res.status(500).json({ resultMessage: `An error occurred in the db query. Err: ${err.message}` });
        }

        let addTimesQuery = `
        INSERT INTO Times (session_date, slot) 
        VALUES ('${body.date}', ${body.slot})
        ON CONFLICT DO NOTHING;
        `

        db.query(addTimesQuery, (err, data) => {
          if (err) {
            const revertSessionQuery = `
            DELETE FROM Session WHERE session_id = ${body.session_id};
            `;

            db.query(revertSessionQuery);
            return res.status(500).json({ resultMessage: `An error occurred in the db query. Err: ${err.message}` });

          }

          let addPlaysQuery = `
          INSERT INTO Plays (session_date, slot, theatre_id, session_id)
          VALUES ('${body.date}', ${body.slot}, ${body.theatre_id}, ${body.session_id});
          `;

          db.query(addPlaysQuery, (err, data) => {
            if (err) {
              const revertSessionQuery = `
              DELETE FROM Session WHERE session_id = ${body.session_id};
              `;

              db.query(revertSessionQuery);
              return res.status(500).json({ resultMessage: `An error occurred in the db query. Err: ${err.message}` });

            } else {
              return res.status(200).json({ resultMessage: "Session is successfully added." })
            }
          })
        });
      });
    });
  } catch (err) {

    return res.status(500).json({ resultMessage: `An unexpected server error occurred. Err: ${err.message}` });

  }
};
