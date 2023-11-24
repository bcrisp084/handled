const sequelize = require("../../handled/config/connection");
const { DataTypes, Model } = require("sequelize");
const bcrypt = require("bcrypt");

class User extends Model {
  async passwordValidate(passPhrase) {
    return await bcrypt.compare(passPhrase, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      notNull: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false, // Changed from notNull to allowNull
      validate: {
        is: /^[a-z]+$/i, // Use the 'is' validation for alphanumeric characters
      },
    },

    email: {
      type: DataTypes.STRING,
      notNull: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      notNull: true,
      validate: {
        len: [5, 20],
      },
    },
    joinDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    hooks: {
      beforeCreate: (user) => {
        user.username = user.username.toLowerCase();
      },
      beforeCreate: async (newUser) => {
        newUser.password = await bcrypt.hash(newUser.password, 10);
      },
      beforeUpdate: (user) => {
        user.username = user.username.toLowerCase();
      },
      beforeUpdate: async (updatePassword) => {
        updatePassword.password = await bcrypt.hash(
          updatePassword.password,
          10
        );
      },
    },

    sequelize,
    modelName: "user",
    timestamps: false,
    // paranoid: true,
    // deletedAt: "destroyTime",
    // freezeTableName: true,
    // underscored: true,
    // indexes: [
    //   {
    //     unique: true,
    //     fields: ["username"],
    //   },
    // ],
    // scopes: {
    //   withoutPassword: {
    //     attributes: { exclude: ["password"] },
    //   },
    // },
    // schema: "public",
  }
);

module.exports = User;
