// read values from .env file
import * as dotenv from 'dotenv';
dotenv.config();

import * as express from "express";
import { caretakersController } from "./controllers/carerecipients";
import { eventsController } from "./controllers/events";
import { pingController } from "./controllers/ping";

const app = express();

app.all("*", (_, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type,Content-Length, Authorization, Accept,X-Requested-With"
  );
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");

  next();
});

app.use(pingController);
app.use(caretakersController);
app.use(eventsController);

export default app;
