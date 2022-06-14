import { DataTypes } from "sequelize";
import { sequelize } from "../db/dbConnect.js";

const Client = sequelize.define('client', {
    Email: { 
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    Id_Number: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    Client_Name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Phone: {
        type: DataTypes.BIGINT,
        allowNull: false

    }
}, {

    sequelize,
    tableName: 'client',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Email" },
        ]
      },
    ]
  
});

export default Client
