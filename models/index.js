const todo = require("./Todo");
const user = require("./User");
const note = require("./Note");
const images = require("./Image");

user.hasMany(todo, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

todo.belongsTo(user, {
  foreignKey: "user_id",
});

user.hasMany(note, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

note.belongsTo(user, {
  foreignKey: "user_id",
});

user.hasMany(images, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

images.belongsTo(user, {
  foreignKey: "user_id",
});

module.exports = { user, todo, note, images };
