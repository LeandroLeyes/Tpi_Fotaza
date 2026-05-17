import { Model, DataType } from "sequelize";
import sequelize from "./config.js";

export class Seguimiento extends Model {}

Seguimiento.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  {
    tableName: "seguimientos",

    timestamps: true,
    paranoid: true,
  },
);
