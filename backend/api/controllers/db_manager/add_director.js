import crypto from 'crypto';
import client from '../../../loaders/db_loader.js';

export default async (req, res) => {
  const body = req.body;
  if (!body || !body.username || !body.password || !body.name || !body.surname || !body.nation) {
    return res.status(400).json({ "resultMessage": "Please provide all required fields to create an instructor." });
  }

  try {
    const db = await client();
    const hashedPassword = crypto.createHash('sha256').update(body.password).digest('base64');

    const addUserQuery = `
      INSERT INTO Users (username, user_name, user_surname, user_password)
      VALUES ('${body.username}', '${body.name}', '${body.surname}', '${hashedPassword}'); 
    `;

    if (!body.platform_id) {
      var addDirectorQuery = `
        INSERT INTO Director (username, nation)
        VALUES ('${body.username}', '${body.nation}'); 
      `;
    } else {
      var addDirectorQuery = `
        INSERT INTO Director (username, nation, platform_id)
        VALUES ('${body.username}', '${body.nation}', '${body.platform_id}'); 
      `;
    }

    db.query(addUserQuery, (err, data) => {
      if (err) {
        return res.status(500).json({ resultMessage: `An error occurred in the db query. Err: ${err.message}` });
      }
    });

    db.query(addDirectorQuery, (err, data) => {
      if (err) {
        const revertUserQuery = `
        DELETE FROM Users WHERE username = ${body.username};
        `;
        db.query(revertUserQuery);
        return res.status(500).json({ resultMessage: `An error occurred in the db query. Err: ${err.message}` });
      } else {
        return res.status(200).json({ resultMessage: "Director is successfully added." });
      }
    });


  } catch (err) {
    console.log(err);
    return res.status(500).json({ resultMessage: `An unexpected server error occurred. Err: ${err.message}` });
  }
};
