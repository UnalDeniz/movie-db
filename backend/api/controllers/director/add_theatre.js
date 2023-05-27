
import client from '../../../loaders/db_loader.js';

export default async (req, res) => {
  const body = req.body;
  if (!body || !body.id || !body.name || !body.capacity || !body.district) {
    return res.status(400).json({ "resultMessage": "Please provide all required fields to create a theatre." });
  }

  try {
    const db = await client();

    const addTheatreQuery = `
      INSERT INTO Theatre (theatre_id, theatre_name, capacity, district)
      VALUES (${body.id}, '${body.name}', ${body.capacity}, '${body.district}'); 
    `;

    db.query(addTheatreQuery, (err, data) => {
      if (err) {
        return res.status(500).json({ resultMessage: `An error occurred in the db query. Err: ${err.message}` });
      } else {
        return res.status(200).json({ resultMessage: "Theatre is succesfully added." });
      }
    });
  } catch (err) {

    return res.status(500).json({ resultMessage: `An unexpected server error occurred. Err: ${err.message}` });

  }
};
