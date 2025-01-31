import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const OrderLine = sequelize.define("order_lines", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  unit_price_ht: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  tva: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  reduction: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
});

export default OrderLine;
