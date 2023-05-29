import client from '../../../loaders/db_loader.js';

export default async (req, res) => {
  try {

    const db = await client();

    const listDirectorQuery = `
    SELECT U.username, U.user_name AS name, U.user_surname AS surname, D.nation, D.platform_id
    FROM Users U, Director D
    WHERE U.username = D.username;
    `;

    db.query(listDirectorQuery, (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ resultMessage: `En error occured in the db query. Err: ${err.message}` });
      }

      return res.status(200).json({ resultMessage: `Directors are successfully listed.`, Directors: data.rows });
    })

  } catch (err) {

    return res.status(500).json({ resultMessage: `An unexpected server error occured. Err: ${err.message}` });

  }
}
