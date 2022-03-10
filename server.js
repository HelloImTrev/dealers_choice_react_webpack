//DATA LAYER
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("postgres://localhost/todo_list");

const Task = sequelize.define("task", {
  name: {
    type: DataTypes.STRING,
  },
});

const init = async () => {
  try {
    await sequelize.sync({ force: true });
    await Task.create({ name: "Laundry" });
    await Task.create({ name: "Gorcery Shopping" });
    await Task.create({ name: "Taxes" });
  } catch (e) {
    console.log(e);
  }
};

init();

//EXPRESS APPLICATION
const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

app.use("/dist", express.static(path.join(__dirname, "dist")));
app.use(express.json());

app.post("/api/tasks", async (req, res, next) => {
  try {
    await Task.create(req.body);
  } catch (e) {
    next(e);
  }
});

app.delete('/api/tasks/:id', async (req, res, next) => {
  try{
    const destroyedTask = await Task.findByPk(req.params.id);
    console.log(destroyedTask)
    await destroyedTask.destroy();
  } catch(e) {
    next(e);
  }
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/api/tasks", async (req, res, next) => {
  try {
    res.send(await Task.findAll({}));
  } catch (e) {
    next(e);
  }
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
