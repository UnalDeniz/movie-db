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
                SELECT * FROM Db_manager WHERE db_name = '${username}';
                `;
            db.query(findUserName, (err, data) => {
                if (err) {
                  return res.status(500).json({ resultMessage: `An error occurred in the db query. Err: ${err.message}` });
                }
                else if (!(data.rows[0])) {
                  return res.status(401).send({message: "You do not have the access."});
                    
                }
                else {
                  req.userName=data.rows[0].db_name;
                  next();
                }
            });           
            
        }catch(err){
          console.log(err);
          if (err.name && err.name == "JsonWebTokenError") {
            return res.status(401).send({message: "Invalid token!"});
          }
          return res.status(500).send(err);
        }
    },
    verifyDirector: async function (req,res,next) {
      const db = await client();
      const token = (req.headers.authorization || "").replace(
        /^Bearer\s/,
        ""
      );
      if(!token) return res.status(401).send({message: 'Provide an access token'});
      try{
          const username = jwt.verify(token,process.env.SECRET_KEY).username;
          const findUserName = `
              SELECT * FROM Director WHERE username = '${username}';
              `;
          db.query(findUserName, (err, data) => {
              if (err) {
                return res.status(500).json({ resultMessage: `An error occurred in the db query. Err: ${err.message}` });
              }
              else if (!(data.rows[0])) {
                return res.status(401).send({message: "You do not have the access."});
                  
              }
              else {
                req.userName=data.rows[0].username;
                req.platformId=data.rows[0].platform_id;
                req.nation=data.rows[0].nation;
                next();
              }
          });           
          
      }catch(err){
        console.log(err);
        if (err.name && err.name == "JsonWebTokenError") {
          return res.status(401).send({message: "Invalid token!"});
        }
        return res.status(500).send(err);
      }
  },
  verifyAudience: async function (req,res,next) {
    const db = await client();
    const token = (req.headers.authorization || "").replace(
      /^Bearer\s/,
      ""
    );
    if(!token) return res.status(401).send({message: 'Provide an access token'});
    try{
        const username = jwt.verify(token,process.env.SECRET_KEY).username;
        const findUserName = `
            SELECT * FROM Audience WHERE username = '${username}';
            `;
        db.query(findUserName, (err, data) => {
            if (err) {
              return res.status(500).json({ resultMessage: `An error occurred in the db query. Err: ${err.message}` });
            }
            else if (!(data.rows[0])) {
              return res.status(401).send({message: "You do not have the access."});
                
            }
            else {
              req.userName=data.rows[0].username;
              next();
            }
        });           
        
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
