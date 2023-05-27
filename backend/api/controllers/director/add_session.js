import client from '../../../loaders/db_loader.js';

export default async (req, res) => {
  const body = req.body;
  if (!body || !body.session_id || !body.movie_id) {
    return res.status(400).json({ "resultMessage": "Please provide all required fields to create a session." });
  }

  try {
    const db = await client();

    const addSessionQuery = `
      INSERT INTO Session (session_id, movie_id)
      VALUES (${body.session_id}, ${body.movie_id}); 
    `;

    db.query(addSessionQuery, (err, data) => {
      if (err) {
        return res.status(500).json({ resultMessage: `An error occurred in the db query. Err: ${err.message}` });
      } else {
        return res.status(200).json({ resultMessage: "Session is succesfully added." });
      }
    });
  } catch (err) {

    return res.status(500).json({ resultMessage: `An unexpected server error occurred. Err: ${err.message}` });

  }
};
