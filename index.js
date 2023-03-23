"use strict";
import express from "express";
import { engine } from "express-handlebars";
import { saveData, getData } from "./src/db.js";
import { login } from "./src/controllers/login.js";
import { addUser } from "./src/controllers/add-user.js";
import { deleteUser } from "./src/controllers/delete-user.js";
import { protectRoute } from "./src/middleware/protectRoute.js";
import session from "express-session";
import { useGlobalsFromSession } from "./src/use-globals-from-session.js";

const app = express();

app.use(
  session({
    secret: "secret string have it in env vars",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

app.get("/", (req, res) => {
  res.render("login", { globals: useGlobalsFromSession(req.session) });
});

app.post("/login", login);

app.get("/administratorius", protectRoute, async (req, res) => {
  let users = await getData();
  users = users.map((user) => {
    if (user.email === req.session.user.email) {
      user.current = "true";
    }
    return user;
  });
  res.render("admin", { users, globals: useGlobalsFromSession(req.session) });
});
app.get("/logout", protectRoute, (req, res) => {
  req.session.user = null;
  req.session.destroy();
  res.redirect("/");
});
app.get("/add-user", protectRoute, (req, res) => {
  res.render("add-user", { globals: useGlobalsFromSession(req.session) });
});

app.post("/add-user", protectRoute, addUser);
app.get("/delete-user/:id", protectRoute, deleteUser);

app.listen(3000, () => {
  console.log("server on port 3000");
});
