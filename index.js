import express from "express";
import { engine } from "express-handlebars";
import { saveData } from "./src/db.js";
import { login } from "./src/login.js";
const app = express();

app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

app.get("/", (req, res) => {
  res.render("login");
});

app.post("/login", async (req, res) => {
  const isLoggedIn = await login(req.body);
  if (isLoggedIn) {
    res.redirect("/administratorius");
  } else {
    res.redirect("/");
  }
});

app.get("/administratorius", (req, res) => {
  res.render("admin");
});

app.post("/add-user", async (req, res) => {
  await saveData(req.body);
  res.redirect("/");
});

app.listen(5000, () => {
  console.log("server on port 5000");
});
