import { Model, DataTypes } from "sequelize";
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
    sequelize,
    tableName: "seguimientos",
    timestamps: true,
    paranoid: true,
  },
);
