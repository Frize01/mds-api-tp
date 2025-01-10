import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Supplier from "./Supplier.js";
import OrderLine from "./OrderLine.js";

const Product = sequelize.define("products", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    reduce_pourcentage: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    reference: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    category: {
        type: DataTypes.ENUM('service', 'product'),
        allowNull: false,
    },
});

Product.belongsTo(Supplier, {
    foreignKey: "id_supplier",
    onDelete: "NULL",
    onUpdate: "CASCADE",
});

Product.hasMany(OrderLine, {
    foreignKey: "id_product",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

export default Product;