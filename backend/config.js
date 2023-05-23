import { config } from 'dotenv';
config();

// This file imports the environment variables from the .env file

const { PORT, DB_HOST, DB_USER, DB_PASSWORD, DB_PORT, DB_NAME, BASE_URL } = process.env

export const port = PORT || 3000;
export const host = DB_HOST;
export const user = DB_USER;
export const password = DB_PASSWORD;
export const dbPort = DB_PORT;
export const dbName = DB_NAME;
export const baseURL = BASE_URL || "/api";
