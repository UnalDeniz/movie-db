import client from '../../../loaders/db_loader.js';

export default async (req, res) => {
  const body = req.body;
  if (!body || !body.date || !body.slot) {
    return res.status(400).json({ "resultMessage": "Please provide all required fields to create a slot." });
  }

  try {
    const db = await client();

    const addSlotQuery = `
      INSERT INTO Times (session_date, slot)
      VALUES ('${body.date}', ${body.slot}); 
    `;

    db.query(addSlotQuery, (err, data) => {
      if (err) {
        return res.status(500).json({ resultMessage: `An error occurred in the db query. Err: ${err.message}` });
      } else {
        return res.status(200).json({ resultMessage: "Slot is succesfully added." });
      }
    });
  } catch (err) {

    return res.status(500).json({ resultMessage: `An unexpected server error occurred. Err: ${err.message}` });

  }
};
