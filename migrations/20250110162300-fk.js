"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface, Sequelize) => {
        // Ajout de la colonne id_supplier dans users
        await queryInterface.addColumn("users", "id_supplier", {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: "suppliers",
                key: "id",
            },
            onDelete: "SET NULL",
            onUpdate: "CASCADE",
        });

        // Ajout de la colonne id_user dans comments
        await queryInterface.addColumn("comments", "id_user", {
            type: Sequelize.INTEGER,
            references: {
                model: "users",
                key: "id",
            },
            onDelete: "SET NULL",
            onUpdate: "CASCADE",
        });

        // Ajout de la colonne id_product dans comments
        await queryInterface.addColumn("comments", "id_product", {
            type: Sequelize.INTEGER,
            references: {
                model: "products",
                key: "id",
            },
            onDelete: "SET NULL",
            onUpdate: "CASCADE",
        });

        // Ajout de la colonne id_user dans orders
        await queryInterface.addColumn("orders", "id_user", {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: "users",
                key: "id",
            },
            onDelete: "SET NULL",
            onUpdate: "CASCADE",
        });

        // Ajout de la colonne id_route dans orders
        await queryInterface.addColumn("orders", "id_route", {
            type: Sequelize.INTEGER,
            references: {
                model: "routes",
                key: "id",
            },
            onDelete: "SET NULL",
            onUpdate: "CASCADE",
        });

        // Ajout de la colonne id_order dans order_lines
        await queryInterface.addColumn("order_lines", "id_order", {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: "orders",
                key: "id",
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        });

        // Ajout de la colonne id_product dans order_lines
        await queryInterface.addColumn("order_lines", "id_product", {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: "products",
                key: "id",
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        });

        // Ajout de la colonne id_supplier dans products
        await queryInterface.addColumn("products", "id_supplier", {
            type: Sequelize.INTEGER,
            references: {
                model: "suppliers",
                key: "id",
            },
            onDelete: "SET NULL",
            onUpdate: "CASCADE",
        });

        await queryInterface.addColumn("routes", "id_user", {
            type: Sequelize.INTEGER,
            references: {
                model: "users",
                key: "id",
            },
            onDelete: "SET NULL",
            onUpdate: "CASCADE",
        });

        // Ajout de la colonne id_vehicule dans routes
        await queryInterface.addColumn("routes", "id_vehicule", {
            type: Sequelize.INTEGER,
            references: {
                model: "vehicules",
                key: "id",
            },
            onDelete: "SET NULL",
            onUpdate: "CASCADE",
        });
    },

    down: async (queryInterface, Sequelize) => {
        // Retrait des colonnes ajoutées
        await queryInterface.removeColumn("users", "id_supplier");
        await queryInterface.removeColumn("comments", "id_user");
        await queryInterface.removeColumn("comments", "id_product");
        await queryInterface.removeColumn("orders", "id_user");
        await queryInterface.removeColumn("orders", "id_route");
        await queryInterface.removeColumn("order_lines", "id_order");
        await queryInterface.removeColumn("order_lines", "id_product");
        await queryInterface.removeColumn("products", "id_supplier");
        await queryInterface.removeColumn("routes", "id_user");
        await queryInterface.removeColumn("routes", "id_vehicule");
    },
};
