const sequelize = require("../../handled/config/connection");
const { DataTypes, Model } = require("sequelize");

class Note extends Model {}

Note.init(
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
    modelName: "note",
  }
);

module.exports = Note;
