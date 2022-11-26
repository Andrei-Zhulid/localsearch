import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();

const app: Application = express();

app.get('/search', (request: Request, response: Response) => {
  try {
    response.status(200).end();
  } catch (error) {
    console.log('GET / error', error);
    response.status(500).end();
  }
})

app.listen(process.env.PORT, () => console.log('Service is running'));