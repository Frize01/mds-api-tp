import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Order = sequelize.define("orders", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    ordered_at: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    payment_method: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    street: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    zip_code: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    delivery_time: {
        type: DataTypes.TIME,
        allowNull: true,
    },
    tracking_number: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    delivery_notes: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
});

Order.belongsTo(User, {
    foreignKey: "id_user",
    onDelete: "NULL",
    onUpdate: "CASCADE",
});

Order.belongsTo(Route, {
    foreignKey: "id_route",
    onDelete: "NULL",
    onUpdate: "CASCADE",
});



export default Order;