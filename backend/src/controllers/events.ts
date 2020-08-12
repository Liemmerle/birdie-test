import * as express from "express";
import { Op } from "sequelize";
import { names, uniqueNamesGenerator } from "unique-names-generator";
import { EventModel } from "./../../models/event";

export const eventsController = express.Router();

eventsController.get(
  "/events/:care_recipient/:min_timestamp/:max_timestamp",
  (req, res) => {
    if (isNaN(Number.parseInt(req.params.min_timestamp, 10))
      || isNaN(Number.parseInt(req.params.max_timestamp, 10))) {
      res.status(400).json({ error: "invalid date format" });
    } else {

      const minDate = new Date(Number.parseInt(req.params.min_timestamp, 10));
      const maxDate = new Date(Number.parseInt(req.params.max_timestamp, 10));

      EventModel.findAll({
        where: {
          care_recipient_id: {
            [Op.eq]: req.params.care_recipient,
          },
          timestamp: {
            [Op.between]: [minDate.toISOString(), maxDate.toISOString()],
          },
        },
      })
        .then((evts) => {
          // replace caregiver_id by random generated names
          evts = evts.map(evt => {
            if (evt.caregiver_id) {
              const randomName = uniqueNamesGenerator({
                dictionaries: [names],
                length: 1,
                seed: evt.caregiver_id.split('').reduce<number>((n, val) => val.charCodeAt(0) + n, 55456465),
              });
              evt.caregiver_id = randomName;
              if (evt.payload.caregiver_id) {
                evt.payload.caregiver_id = randomName;
              }
            }

            return evt;
          });
          res.status(200).json({
            events: evts,
          });
        })
        .catch((err) => res.status(500).json({ error: err }))
        .finally();
    }
  }
);
