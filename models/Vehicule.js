import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Route from "./Route.js";

const Vehicule = sequelize.define("vehicules", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    immatriculation: {
        type: DataTypes.STRING,
        allowNull: false,
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

Vehicule.belongsTo(Route, {
    foreignKey: "id_vehicule",
    onDelete: "NULL",
    onUpdate: "CASCADE",
});

export default Vehicule;
