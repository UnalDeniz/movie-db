import express from 'express';
import cors from 'cors';
import { port, baseURL } from './config.js';
import loader from './loaders/index.js';
import router from './api/routes/index.js';

const app = express();

loader(app);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(baseURL, router);

app.listen(port, err => {
  if (err) {
    console.log(err);
    return process.exit(1);
  }
  console.log(`Server is running on ${port}`);
});

export default app
