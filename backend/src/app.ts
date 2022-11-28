import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

import SearchService from './services/SearchService';

const app: Application = express();
const options: cors.CorsOptions = { origin: ['http://localhost:8080'] };

app.use(cors(options));

app.get('/search', (request: Request, response: Response) => {
  try {
    if (request.query.id) {
      const place = SearchService.getPlaceDetails(<string>request.query.id);
      if (!place)
        response.status(404).end();
      else
        response.send(place);
    } else {
      const places = SearchService.search(<string>request.query.query);
      response.send(places);
    }
  } catch (error) {
    console.log('GET /search error', error);
    response.status(500).end();
  }
})

app.listen(process.env.PORT, () => console.log('Service is running'));