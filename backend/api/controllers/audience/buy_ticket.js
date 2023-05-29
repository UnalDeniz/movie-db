import client from '../../../loaders/db_loader.js';

export default async (req, res) => {
  const body = req.body;
  if (!body || !body.session_id) {
    return res.status(400).json({ "resultMessage": "Please provide all required fields to buy a ticket." });
  }

  try {
    const db = await client();

    const buyTicketQuery = `
      INSERT INTO Buys_ticket (username, session_id)
      VALUES ('${req.userName}', ${body.session_id}); 
    `;

    db.query(buyTicketQuery, (err, data) => {
      if (err) {
        return res.status(500).json({ resultMessage: `An error occurred in the db query. Err: ${err.message}` });
      } else {
        return res.status(200).json({ resultMessage: "Ticket is succesfully bought." });
      }
    });
  } catch (err) {

    return res.status(500).json({ resultMessage: `An unexpected server error occurred. Err: ${err.message}` });

  }
};
