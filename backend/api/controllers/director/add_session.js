import client from '../../../loaders/db_loader.js';

export default async (req, res) => {
  const body = req.body;
  if (!body || !body.session_id || !body.movie_id || !body.theatre_id || !body.slot || !body.date) {
    return res.status(400).json({ "resultMessage": "Please provide all required fields to create a session." });
  }

  try {
    const db = await client();

    const addSessionQuery = `
      INSERT INTO Session (session_id, movie_id)
      VALUES (${body.session_id}, ${body.movie_id}); 
    `;

    const getDurationQuery = `
    SELECT duration FROM Movie WHERE movie_id = ${body.movie_id};
    `
    db.query(addSessionQuery, (err, data) => {
      if (err) {
        return res.status(500).json({ resultMessage: `An error occurred in the db query. Err: ${err.message}` });
      }

      db.query(getDurationQuery, (err, data) => {
        let duration = data.rows[0].duration;

        let addTimesQuery = `
        INSERT INTO Times (session_date, slot) 
        VALUES ('${body.date}', ${body.slot})
        ON CONFLICT DO NOTHING;
        `

        db.query(addTimesQuery);

        let addPlaysQuery = `
        INSERT INTO Plays (session_date, slot, theatre_id, session_id)
        VALUES ('${body.date}', ${body.slot}, ${body.theatre_id}, ${body.session_id});
        `;

        db.query(addPlaysQuery, (err, data) => {
          if (err) {
            return res.status(500).json({ resultMessage: `An error occurred in the db query. Err: ${err.message}` });
          } else {
            return res.status(200).json({ resultMessage: "Session is successfully added." })
          }
        })
      })
    });
  } catch (err) {

    return res.status(500).json({ resultMessage: `An unexpected server error occurred. Err: ${err.message}` });

  }
};
