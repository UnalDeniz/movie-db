import client from '../../../loaders/db_loader.js';

export default async (req, res) => {
  const body = req.body;
  if (!body || !body.genre_id || !body.genre_name) {
    return res.status(400).json({ "resultMessage": "Please provide all required fields to create a genre." });
  }

  try {
    const db = await client();

    const addGenreQuery = `
      INSERT INTO Genre (genre_id, genre_name)
      VALUES (${body.genre_id}, '${body.genre_name}'); 
    `;

    db.query(addGenreQuery, (err, data) => {
      if (err) {
        return res.status(500).json({ resultMessage: `An error occurred in the db query. Err: ${err.message}` });
      } else {
        return res.status(200).json({ resultMessage: "Genre is succesfully added." });
      }
    });
  } catch (err) {

    return res.status(500).json({ resultMessage: `An unexpected server error occurred. Err: ${err.message}` });

  }
};
