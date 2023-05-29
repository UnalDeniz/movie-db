

import client from '../../../loaders/db_loader.js';

export default async (req, res) => {
  try {

    const db = await client();

    if (!req.query.slot || !req.query.date) {
      return res.status(400).json({ resultMessage: "Please provide all required fields to list the theatres" });
    }

    const listTheatreQuery = `
    SELECT T.theatre_id, district, capacity AS theatre_capacity FROM Theatre T
    WHERE T.theatre_id NOT IN (SELECT P.theatre_id FROM Plays P 
    WHERE P.slot = ${req.query.slot} AND P.session_date = '${req.query.date}');`;

    db.query(listTheatreQuery, (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ resultMessage: `En error occured in the db query. Err: ${err.message}` });
      }

      return res.status(200).json({ resultMessage: `Theatres are successfully listed.`, Theatre: data.rows });
    });
  } catch (err) {

    return res.status(500).json({ resultMessage: `An unexpected server error occured. Err: ${err.message}` });

  }
}
