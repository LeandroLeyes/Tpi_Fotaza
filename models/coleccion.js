import { Model, DataType } from "seuquelize";
import sequelize from "./config.js";

export class Coleccion extends Model {}

Coleccion.init(
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
    tableName: "colecciones",

    timestamps: true,
    paranoid: true,
  },
);
