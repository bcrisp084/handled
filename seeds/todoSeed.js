const sequelize = require("../config/connection");
const { DataTypes, Model } = require("sequelize");
const Todo = require("../models/Todo");

const seedTodos = [
  {
    text: "Buy groceries",
    isImportant: false,
    isDone: false,
    user_id: 1,
    due_date: "2021-01-01",
  },
  {
    text: "Call mom",
    isImportant: true,
    isDone: false,
    user_id: 1,
    due_date: "2023-01-02",
  },
  {
    text: "Do the laundry",
    isImportant: false,
    isDone: true,
    user_id: 2,
    due_date: "2023-10-08",
  },
  {
    text: "Basement lights",
    isImportant: false,
    isDone: false,
    user_id: 2,
    due_date: "2023-10-08",
  },
  {
    text: "Do homework",
    isImportant: false,
    isDone: false,
    user_id: 3,
    due_date: "2023-10-02",
  },
  {
    text: "Time with kids",
    isImportant: true,
    isDone: false,
    user_id: 3,
    due_date: "2023-11-24",
  },
];

const seedAll = async () => {
  await sequelize.sync({ force: true });
  await Todo.bulkCreate(seedTodos);
  process.exit(0);
};

seedAll();
