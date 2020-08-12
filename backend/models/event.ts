import { DataTypes, Model } from "sequelize";
import { database } from "./../config/database";

// tslint:disable: variable-name
export class EventModel extends Model {
  public payload!: {
    alert_id: string | null;
    task_instance_id: string | null;
    visit_id: string | null;
    caregiver_id: string | null;
    rejected_event_id: string | null;
    observation_event_id: string | null;
    timestamp: Date;
    id: string;
    event_type: string;
    care_recipient_id: string;
  };
  public alert_id!: string;
  public task_instance_id!: string;
  public visit_id!: string;
  public caregiver_id!: string;
  public payload_as_text!: string;
  public rejected_event_id!: string;
  public observation_event_id!: string;
  public timestamp!: Date;
  public id!: string;
  public event_type!: string;
  public care_recipient_id!: string;
}

EventModel.init(
  {
    alert_id: {
      type: new DataTypes.CHAR(36),
    },
    care_recipient_id: {
      type: new DataTypes.CHAR(36),
    },
    caregiver_id: {
      type: new DataTypes.CHAR(36),
    },
    event_type: {
      type: new DataTypes.CHAR(50),
    },
    id: {
      primaryKey: true,
      type: new DataTypes.CHAR(36),
    },
    observation_event_id: {
      type: new DataTypes.CHAR(36),
    },
    payload: {
      type: DataTypes.JSON,
    },
    payload_as_text: {
      type: new DataTypes.TEXT(),
    },
    rejected_event_id: {
      type: new DataTypes.CHAR(36),
    },
    task_instance_id: {
      type: new DataTypes.CHAR(36),
    },
    timestamp: {
      type: new DataTypes.CHAR(50),
    },
    visit_id: {
      type: new DataTypes.CHAR(36),
    },
  },
  {
    sequelize: database,
    tableName: "events",
    timestamps: false,
  }
);
