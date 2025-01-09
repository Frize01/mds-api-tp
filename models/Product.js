import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

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
});

Product.belongsTo(Supplier, {
    foreignKey: "id_supplier",
    onDelete: "NULL",
    onUpdate: "CASCADE",
});

export default Product;