import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";

import stringsController from "./controllers/strings";


const app: Express = express();

mongoose.connect("mongodb+srv://ervintombak:0MTJOEpkQwWA1Iei@cluster0.yynfjjn.mongodb.net/");
const database = mongoose.connection;

database.on('error', (error) => {
  console.log(error)
})

database.once('connected', () => {
  console.log('Database Connected');
})

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.use('/', stringsController);

app.listen(3000,() => {
  console.log(`[server]: Server is running at http://localhost:3000`);
});