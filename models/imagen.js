import { Model, DataTypes } from "sequelize";
import sequelize from "./config.js";

export class Imagen extends Model {}

Imagen.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    url: {
      type: DataTypes.BLOB,
      allowNull: false,
    },

    licencia: DataTypes.STRING,

    marcaAgua: DataTypes.STRING,
  },
  {
    sequelize,
    tableName: "imagenes",
    timestamps: true,
    paranoid: true,
  },
);
