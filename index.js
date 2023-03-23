"use strict";
import express from "express";
import { engine } from "express-handlebars";
import { saveData, getData } from "./src/db.js";
import { login } from "./src/controllers/login.js";
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
  res.render("admin", { users: await getData(), globals: useGlobalsFromSession(req.session) });
});
app.get("/logout", protectRoute, (req, res) => {
  req.session.user = null;
  req.session.destroy();
  res.redirect("/");
});

app.post("/add-user", protectRoute, async (req, res) => {
  await saveData(req.body);
  res.redirect(req.headers.referer.slice(0, req.headers.referer.indexOf("&")) + `&msg=Administratorius pridėtas ${req.body.name}`); //back..
});

app.listen(3000, () => {
  console.log("server on port 3000");
});
