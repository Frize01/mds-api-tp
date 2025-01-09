import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Supplier from "./Supplier.js";
const User = sequelize.define("users", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

User.belongsTo(Supplier, {
    foreignKey: "id_supplier",
    onDelete: "NULL",
    onUpdate: "CASCADE",
});

export default User;
