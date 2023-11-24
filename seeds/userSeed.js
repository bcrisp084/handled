const sequelize = require("../config/connection");
const { DataTypes, Model } = require("sequelize");
const User = require("../models/User");

const userData = [
  {
    username: "john_doe",
    email: "john@example.com",
    password: "password123",
  },
  {
    username: "jane_doe",
    email: "jane@example.com",
    password: "securePass",
  },
  {
    username: "alice_smith",
    email: "alice@example.com",
    password: "pass1234",
  },
  {
    username: "bob_jones",
    email: "bob@example.com",
    password: "secretPass",
  },
  {
    username: "emma_wilson",
    email: "emma@example.com",
    password: "emmaPass",
  },
];

const seedUsers = async () => {
  await User.bulkCreate(userData, { individualHooks: true });
  process.exit(0);
};

seedUsers();
