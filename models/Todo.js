const sequelize = require("../../handled/config/connection");
const { DataTypes, Model } = require("sequelize");
// console.log("dataTypes", DataTypes);

class Todo extends Model {}

Todo.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false, // Changed from notNull to allowNull
      primaryKey: true,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false, // Changed from notNull to allowNull
    },
    isDone: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isImportant: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    due_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "todo",
  }
);

module.exports = Todo;
