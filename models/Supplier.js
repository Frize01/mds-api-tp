import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Supplier = sequelize.define("suppliers", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    siret: {
        type: DataTypes.STRING,
        allowNull: false,
        maxLength: 14,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

export default Supplier;
