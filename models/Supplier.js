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
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

Supplier.hasMany(User, {
    foreignKey: "id_supplier",
    onDelete: "NULL",
    onUpdate: "CASCADE",
});

Supplier.hasMany(Product, {
    foreignKey: "id_supplier",
    onDelete: "NULL",
    onUpdate: "CASCADE",
});

export default Supplier;
