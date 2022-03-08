//DATA LAYER
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("postgres://localhost/todo_list");

const Task = sequelize.define("task", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const init = async () => {
  await sequelize.sync({ force: true });
  await Task.create({ name: "Laundry" });
  await Task.create({ name: "Gorcery Shopping" });
  await Task.create({ name: "Taxes" });
};

init();




//EXPRESS APPLICATION
const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

app.use("/dist", express.static(path.join(__dirname, "dist")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/api/tasks", async(req, res, next) => {
  try{
    res.send(await Task.findAll({}));
  } catch(e) {
    next(e);
  }
})

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
