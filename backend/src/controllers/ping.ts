import * as express from "express";

export const pingController = express.Router();

pingController.get('/hello', (_, res) => {
  res.status(200).json({
    greetings: 'Hello world ;)'
  });
});
