import * as express from "express";
import { Sequelize } from "sequelize";
import { names, uniqueNamesGenerator } from "unique-names-generator";
import { EventModel } from "../../models/event";

export const caretakersController = express.Router();

caretakersController.get("/care_recipients", (_, res) => {
  EventModel.findAll({
    attributes: [
      [Sequelize.literal("distinct `care_recipient_id`"), "care_recipient_id"],
    ],
  })
    .then((ids) => {
      res.status(200).json({
        careRecipients: ids.map((id) => ({
          id: id.care_recipient_id,
          name: uniqueNamesGenerator({
            dictionaries: [names],
            length: 1,
            seed: id.care_recipient_id.split('').reduce<number>((n, val) => val.charCodeAt(0) + n, 55456465),
          }),
        })),
      });
    })
    .finally();
});
