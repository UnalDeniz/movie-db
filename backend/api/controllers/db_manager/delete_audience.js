import client from '../../../loaders/db_loader.js';

export default async (req, res) => {
  if (!req.query.username) {
    return res.status(400).json({ "resultMessage": "Please provide the username of the audience that will be deleted." });
  }

  try {
    const db = await client();

    const checkAudienceQuery = `SELECT username FROM Audience WHERE username = '${req.query.username}'`
    const deleteAudienceQuery = ` DELETE FROM Users WHERE username = '${req.query.username}'; `;

    db.query(checkAudienceQuery, (err, data) => {

      if (err) {
        console.log(err);
        return res.status(500).json({ resultMessage: `An error occurred in the db query. Err: ${err.message}` });
      }

      if (!data['rows'][0]) {
        return res.status(404).json({ resultMessage: 'An audience with the given username could not be find.' });
      }

      db.query(deleteAudienceQuery, (err, data) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ resultMessage: `An error occurred in the db query. Err: ${err.message}` });
        }
        return res.status(200).json({ resultMessage: "Audience is successfully deleted." });
      });

    })
  } catch (err) {
    console.log(err);
    return res.status(500).json({ resultMessage: `An unexpected server error occurred. Err: ${err.message}` });
  }
};
