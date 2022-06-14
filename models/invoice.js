import {DataTypes} from 'sequelize';
import {sequelize} from "../db/dbConnect.js";

const Invoice = sequelize.define('invoice', {
    InvoiceId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Amount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'client',
        key: 'Email'
      }
    },
    DueDate: {
      type: DataTypes.DATE,
      allowNull: false
      
    }
  }, {
    sequelize,
    tableName: 'invoice',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "InvoiceId" },
        ]
      },
      {
        name: "Email",
        using: "BTREE",
        fields: [
          { name: "Email" },
        ]
      }
    ]
  });
export default Invoice
