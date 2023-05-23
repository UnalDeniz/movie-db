import jwt from "jsonwebtoken";
import { config } from "dotenv";
import client from '../backend/loaders/db_loader.js';
config();


const verifyUser = {
    verifyManager: async function (req,res,next) {
        const db = await client();
        const token = (req.headers.authorization || "").replace(
          /^Bearer\s/,
          ""
        );
        if(!token) return res.status(401).send({message: 'Provide an access token'});
        try{
            const username = jwt.verify(token,process.env.SECRET_KEY).username;
            const findUserName = `
                SELECT * FROM Directors WHERE username = ${username};
                `;
            db.query(findUserName, (err, data) => {
                if (err) {
                  return res.status(401).json({ resultMessage: `An error occurred in the db query. Err: ${err.message}` });
                }
            });

            if (!user) {
              return res.status(404).send({message: "User not found!"});
            }
            req.username = username;
            req.user = user;
            req.email = user.email;
            next();
        }catch(err){
          console.log(err);
          if (err.name && err.name == "JsonWebTokenError") {
            return res.status(401).send({message: "Invalid token!"});
          }
          return res.status(500).send(err);
        }
    },
    verifyDirector: async function (req,res,next) {
        const token = (req.headers.authorization || "").replace(
          /^Bearer\s/,
          ""
        );
        if(!token) return res.status(401).send({message: 'Provide an access token'});
        try{
            const username = jwt.verify(token,process.env.SECRET_KEY).username;
            const user = await getUserByUsername(username);
            if (!user) {
              return res.status(404).send({message: "User not found!"});
            }
            req.username = username;
            req.user = user;
            req.email = user.email;
            next();
        }catch(err){
          console.log(err);
          if (err.name && err.name == "JsonWebTokenError") {
            return res.status(401).send({message: "Invalid token!"});
          }
          return res.status(500).send(err);
        }
    },
}

export default verifyUser;
