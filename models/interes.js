import { Model, DataTypes } from "sequelize";
import sequelize from "./config.js";

export class Interes extends Model {}

Interes.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  {
    sequelize,
    tableName: "intereses",
    timestamps: true,
    paranoid: true,
  },
);
