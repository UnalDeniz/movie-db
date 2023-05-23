import crypto from 'crypto';
import client from '../../../loaders/db_loader.js';

export default async (req, res) => {
  const body = req.body;
  if (!body || !body.username || !body.password || !body.name || !body.surname) {
    return res.status(400).json({ "resultMessage": "Please provide all required fields to create an instructor." });
  }

  try {
    const db = await client();
    const hashedPassword = crypto.createHash('sha256').update(body.password).digest('base64');

    const addUserQuery = `
      INSERT INTO Users (username, user_name, user_surname, user_password)
      VALUES ('${body.username}', '${body.name}', '${body.surname}', '${hashedPassword}'); 
    `;

    const addAudienceQuery = `
      INSERT INTO Audience (username)
      VALUES ('${body.username}'); 
    `;

    db.query(addUserQuery, (err, data) => {
      if (err) {
        return res.status(500).json({ resultMessage: `An error occurred in the db query. Err: ${err.message}` });
      }
      db.query(addAudienceQuery, (err, data) => {
        if (err) {
          const revertUserQuery = `
          DELETE FROM Users WHERE username = '${body.username}';
          `;
          db.query(revertUserQuery);
          return res.status(500).json({ resultMessage: `An error occurred in the db query. Err: ${err.message}` });
        }
        if (!body.subbed_platforms) {

          return res.status(200).json({ resultMessage: "Audience is successfully added." });

        } else {

          let size = body.subbed_platforms.length;

          for (let i = 0; i < size; i++) {

            let addSubscribeQuery = `
              INSERT INTO Subscribes (platform_id, username)
              VALUES (${body.subbed_platforms[i]}, '${body.username}'); 
            `;

            db.query(addSubscribeQuery, (err, data) => {
              if (err) {
                const revertUserQuery = `
                DELETE FROM Users WHERE username = '${body.username}';
                `;
                db.query(revertUserQuery);
                return res.status(500).json({ resultMessage: `An error occurred in the db query. Err: ${err.message}` });
              } else {
                if (i == size - 1) {
                  return res.status(200).json({ resultMessage: "Audience is successfully added." });
                }
              }
            });
          }
        }
      });
    });
  } catch (err) {

    return res.status(500).json({ resultMessage: `An unexpected server error occurred. Err: ${err.message}` });

  }
};
