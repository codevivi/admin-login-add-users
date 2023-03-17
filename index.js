import express from "express";
import { engine } from "express-handlebars";
const app = express();

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.render("login");
});
app.post("/", (req, res) => {
  if (req.body.email === "admin@bit.lt" && req.body.password === "1234") {
    res.redirect("/administratorius");
  } else {
    res.redirect("/");
  }
});
app.get("/administratorius", (req, res) => {
  res.render("admin");
});

app.listen(3001, () => {
  console.log("server on port 3001");
});
