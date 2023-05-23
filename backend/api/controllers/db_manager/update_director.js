import client from '../../../loaders/db_loader.js';

export default async (req, res) => {
  const body = req.body;
  const query = req.query;
  if (!body || !query.username || !body.platform_id) {
    return res.status(400).json({ "resultMessage": "Please provide all required fields to update an instructor." });
  }

  try {
    const db = await client();

    const checkDirectorQuery = `SELECT username FROM Director WHERE username = '${query.username}'`

    const updateDirectorQuery = `UPDATE Director SET platform_id = ${body.platform_id} WHERE username = '${query.username}';`;

    db.query(checkDirectorQuery, (err, data) => {

      if (err) {
        console.log(err);
        return res.status(500).json({ resultMessage: `An error occurred in the db query. Err: ${err.message}` });
      }

      if (!data['rows'][0]) {
        return res.status(404).json({ resultMessage: 'A director with the given username could not be find.' });
      }

      db.query(updateDirectorQuery, (err, data) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ resultMessage: `An error occurred in the db query. Err: ${err.message}` });
        }
        return res.status(200).json({ resultMessage: "Director is successfully updated." });
      });
    })

  } catch (err) {
    console.log(err);
    return res.status(500).json({ resultMessage: `An unexpected server error occurred. Err: ${err.message}` });
  }
};
