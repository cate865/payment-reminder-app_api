import { DataTypes } from "sequelize";
import { sequelize } from "../db/dbConnect.js";

const User = sequelize.define('user', {
    Email: { 
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    User_Name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Password: {
        type: DataTypes.STRING,
        allowNull: false

    }
}, {

    sequelize,
    tableName: 'user',
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

export default User
