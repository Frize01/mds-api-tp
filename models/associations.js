import User from "./User.js";
import Order from "./Order.js";
import Route from "./Route.js";
import Vehicule from "./Vehicule.js";
import Supplier from "./Supplier.js";
import Product from "./Product.js";
import OrderLine from "./OrderLine.js";
import Comment from "./Comment.js";

// Définir les associations après la création des modèles

// Association entre User et Supplier
User.belongsTo(Supplier, {
  foreignKey: "id_supplier",
  onDelete: "NULL",
  onUpdate: "CASCADE",
  allowNull: true,
});

// Association entre Order et User
Order.belongsTo(User, {
  foreignKey: "id_user",
  onDelete: "NULL",
  onUpdate: "CASCADE",
});

// Association entre Order et Route
Order.belongsTo(Route, {
  foreignKey: "id_route",
  onDelete: "NULL",
  onUpdate: "CASCADE",
});

// Association entre Vehicule et Route
Vehicule.hasMany(Route, {
  foreignKey: "id_vehicule",
  onDelete: "NULL",
  onUpdate: "CASCADE",
});

Route.belongsTo(Vehicule, {
  foreignKey: "id_vehicule",
  onDelete: "NULL",
  onUpdate: "CASCADE",
});

// Association entre Product et Supplier
Product.belongsTo(Supplier, {
  foreignKey: "id_supplier",
  onDelete: "NULL",
  onUpdate: "CASCADE",
});

Supplier.hasMany(Product, {
  foreignKey: "id_supplier",
  onDelete: "NULL",
  onUpdate: "CASCADE",
});

// Association entre Product et OrderLine
Product.hasMany(OrderLine, {
  foreignKey: "id_product",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

OrderLine.belongsTo(Product, {
  foreignKey: "id_product",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

OrderLine.belongsTo(Order, {
  foreignKey: "id_order",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
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
