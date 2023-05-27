import client from '../../../loaders/db_loader.js';
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();
const UserController = {
  loginHandler: async function (req, res) {
    try {
      const db = await client();
      const body = req.body;
      if (!body.username) {
        return res.status(400).send({message: "Provide a username"});
      }
      if (!body.password) {
        return res.status(400).send({message: "Provide a password"});
      } 
      const hashedPassword = crypto.createHash('sha256').update(body.password).digest('base64');
      const query = `
        SELECT * FROM Users WHERE username = '${body.username}' AND user_password = '${hashedPassword}';
        `;
      db.query(query, (err, data) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ resultMessage: `An error occurred in the db query. Err: ${err.message}` });
        }
        const user = data.rows[0];
        if (!user) return res.status(404).json({ resultMessage: 'Could not found a user with the given username and password.' });
        delete user.password;
        const accessToken = jwt.sign({username: user.username}, process.env.SECRET_KEY);
        const query1 = `
        SELECT * FROM Director WHERE username = '${body.username}';
        `;
        const query2 = `
        SELECT * FROM Audience WHERE username = '${body.username}';
        `;
        db.query(query1, (err, data) => {
          if (err) {
            console.log(err);
            return res.status(500).json({ resultMessage: `An error occurred in the db query. Err: ${err.message}` });
          }
          console.log(data.rows[0]);
          const director = data.rows[0];
          if (!director) {
            db.query(query2, (err, data) => {
              if (err) {
                console.log(err);
                return res.status(500).json({ resultMessage: `An error occurred in the db query. Err: ${err.message}` });
              }
              return res.status(200).send({message: "Login is successful", accessToken: accessToken, userType:"audience"});
            });
          }
          else {
            return res.status(200).send({message: "Login is successful", accessToken: accessToken, userType:"director"});
          }
        });
      });
      
    } catch (e) {
      console.log(e);
      return res.status(500).send(e);
    }
  },
  db_loginHandler: async function (req, res) {
    try {
      const db = await client();
      const body = req.body;
      if (!body.db_name) {
        return res.status(400).send({message: "Provide a username"});
      }
      if (!body.password) {
        return res.status(400).send({message: "Provide a password"});
      } 
      const hashedPassword = crypto.createHash('sha256').update(body.password).digest('base64');
      const query = `
        SELECT * FROM Db_manager WHERE db_name = '${body.db_name}' AND user_password = '${hashedPassword}';
        `;
      db.query(query, (err, data) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ resultMessage: `An error occurred in the db query. Err: ${err.message}` });
        }
        const user = data.rows[0];
        if (!user) return res.status(404).json({ resultMessage: 'Could not found a user with the given username and password.' });
        delete user.password;
        const accessToken = jwt.sign({username: user.db_name}, process.env.SECRET_KEY);
        res.status(200).send({message: "Login is successful", accessToken: accessToken, userType:"db_manager"});
      });
      
    } catch (e) {
      console.log(e);
      return res.status(500).send(e);
    }
  }
};

export default UserController;