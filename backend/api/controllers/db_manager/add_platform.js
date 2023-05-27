import client from '../../../loaders/db_loader.js';

export default async (req, res) => {
  const body = req.body;
  if (!body || !body.platform_id || !body.platform_name) {
    return res.status(400).json({ "resultMessage": "Please provide all required fields to create a platform." });
  }

  try {
    const db = await client();

    const addPlatformQuery = `
      INSERT INTO Platform (platform_id, platform_name)
      VALUES (${body.platform_id}, '${body.platform_name}'); 
    `;

    db.query(addPlatformQuery, (err, data) => {
      if (err) {
        return res.status(500).json({ resultMessage: `An error occurred in the db query. Err: ${err.message}` });
      } else {
        return res.status(200).json({ resultMessage: "Platform is succesfully added." });
      }
    });
  } catch (err) {

    return res.status(500).json({ resultMessage: `An unexpected server error occurred. Err: ${err.message}` });

  }
};
