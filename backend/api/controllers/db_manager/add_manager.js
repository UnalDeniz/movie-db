import crypto from 'crypto';
import client from '../../../loaders/db_loader.js';

export default async (req, res) => {
  const body = req.body;
  if (!body || !body.db_name || !body.password) {
    return res.status(400).json({ "resultMessage": "Please provide all required fields to create a manager." });
  }

  try {
    const db = await client();
    const hashedPassword = crypto.createHash('sha256').update(body.password).digest('base64');

    const addManagerQuery = `
      INSERT INTO Db_manager (db_name, user_password)
      VALUES ('${body.db_name}', '${hashedPassword}'); 
    `;

    db.query(addManagerQuery, (err, data) => {
      if (err) {
        return res.status(500).json({ resultMessage: `An error occurred in the db query. Err: ${err.message}` });
      } else {
        return res.status(200).json({ resultMessage: "Manager is succesfully added." });
      }
    });
  } catch (err) {

    return res.status(500).json({ resultMessage: `An unexpected server error occurred. Err: ${err.message}` });

  }
};
