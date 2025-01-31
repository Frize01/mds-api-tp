import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Vehicule = sequelize.define("vehicules", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  immatriculation: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  marque: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  model: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default Vehicule;
