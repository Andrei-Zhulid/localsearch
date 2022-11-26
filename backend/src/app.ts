import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();

import SearchService from '../services/SearchService';

const app: Application = express();

app.get('/search', (request: Request, response: Response) => {
  try {
    const places = SearchService.search(<string> request.query.query);
    response.send(places);
  } catch (error) {
    console.log('GET / error', error);
    response.status(500).end();
  }
})

app.listen(process.env.PORT, () => console.log('Service is running'));