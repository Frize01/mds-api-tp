import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Comment = sequelize.define("comments", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
});

Comment.belongsTo(User, {
    foreignKey: "id_user",
    onDelete: "NULL",
    onUpdate: "CASCADE",
});

Comment.belongsTo(Product, {
    foreignKey: "id_product",
    onDelete: "NULL",
    onUpdate: "CASCADE",
});

export default Comment;