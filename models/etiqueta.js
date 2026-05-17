import { Model, DataTypes } from "sequelize";
import sequelize from "./config.js";

export class Etiqueta extends Model {}

Etiqueta.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "etiquetas",
    timestamps: true,
    paranoid: true,
  },
);
