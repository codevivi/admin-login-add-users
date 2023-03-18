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
  res.render("login", { message: `${req.query.message ? req.query.message : ""}` });
});

app.post("/login", async (req, res) => {
  const userName = await login(req.body);
  if (userName) {
    res.redirect(`/administratorius?name=${userName}&msg=''`);
  } else {
    res.redirect("/?message=Login details did not match");
  }
});

app.get("/administratorius", (req, res) => {
  if (req.query && req.query.name) {
    res.render("admin", { name: req.query.name, msg: req.query.msg });
  } else {
    res.redirect("/");
  }
});
app.get("/logout", (req, res) => {
  // logout logic would be there
  res.redirect("/");
});

app.post("/add-user", async (req, res) => {
  await saveData(req.body);
  res.redirect(req.headers.referer.slice(0, req.headers.referer.indexOf("&")) + `&msg=Administratorius pridėtas ${req.body.name}`); //back..
});

app.listen(5000, () => {
  console.log("server on port 5000");
});
