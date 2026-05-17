import { Model, DataType } from "sequelize";
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
    tableName: "etiquetas",

    timestamps: true,
    paranoid: true,
  },
);
