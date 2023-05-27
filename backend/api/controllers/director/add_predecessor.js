
import client from '../../../loaders/db_loader.js';

export default async (req, res) => {
  const body = req.body;
  if (!body || !body.predecessor || !body.successor) {
    return res.status(400).json({ "resultMessage": "Please provide all required fields to add a predecessor." });
  }

  try {
    const db = await client();

    const addPredecessorQuery = `
      INSERT INTO Succeeds (predecessor_id, successor_id)
      VALUES (${body.predecessor}, ${body.successor}); 
    `;

    db.query(addPredecessorQuery, (err, data) => {
      if (err) {
        return res.status(500).json({ resultMessage: `An error occurred in the db query. Err: ${err.message}` });
      } else {
        return res.status(200).json({ resultMessage: "Predecessor is succesfully added." });
      }
    });
  } catch (err) {

    return res.status(500).json({ resultMessage: `An unexpected server error occurred. Err: ${err.message}` });

  }
};
