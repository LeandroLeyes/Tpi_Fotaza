import { Model, DataTypes } from "sequelize";
import sequelize from "./config.js";

export class Comentario extends Model {}

Comentario.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    contenido: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "comentarios",
    timestamps: true,
    paranoid: true,
  },
);
