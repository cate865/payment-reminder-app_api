import {DataTypes} from 'sequelize';
import {sequelize} from "../db/dbConnect.js";

const Invoice = sequelize.define('invoice', {
    InvoiceId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'client',
        key: 'Email'
      }
    },
    Location: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Task: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Amount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    DueDate: {
      type: DataTypes.DATE,
      allowNull: false
      
    },
    Paid: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
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
