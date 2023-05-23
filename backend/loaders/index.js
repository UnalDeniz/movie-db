import pg from 'pg';
import { dbName, dbPort, host, password, user } from '../config.js';
import dbLoader from './db_loader.js';

const { Pool } = pg;

const dbConfig = {
  host: host,
  user: user,
  password: password,
  port: dbPort
};

export default async () => {
  const client = new Pool(dbConfig);
  client.connect((err) => {
    if (err) {
      console.error('connection error', err.stack)
    } else {
      console.log('connected')
    }
  })
  const dbTestQuery = {
    // give the query a unique name
    name: 'fetch-database',
    text: "SELECT datname FROM pg_database WHERE datname = $1",
    values: [dbName],
  }
  // const createDBQuery = "SELECT datname FROM pg_database WHERE datname = '$1'"
  const created = await client.query(dbTestQuery);
  if (created.rows[0] == null) {
    const createDBQuery = `CREATE DATABASE ${dbName}`;
    client.query(createDBQuery, (err, res) => {
      if (err) console.log('ERROR: ', err)
      else
        console.log("Successfully connected to the database.");
      return dbLoader();
    });
  } else {
    dbLoader();
  }
}
