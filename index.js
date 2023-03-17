import express from "express";
import { engine } from "express-handlebars";
import { save, readFileData } from "./save-to-json.js";
const app = express();

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.render("login");
});
app.post("/login", async (req, res) => {
  let db = await readFileData();
  db = JSON.parse(db);
  let ok = false;
  db.forEach((user) => {
    if (user.password === req.body.password && user.email === req.body.email) {
      ok = true;
    }
  });
  if (ok) {
    res.redirect("/administratorius");
  } else {
    res.redirect("/");
  }
  //   if (req.body.email === "admin@bit.lt" && req.body.password === "1234") {
  //     res.redirect("/administratorius");
  //   } else {
  //     res.redirect("/");
  //   }
});

app.get("/administratorius", (req, res) => {
  res.render("admin");
});
app.post("/add-user", async (req, res) => {
  await save(req.body);
  res.redirect("/");
});

app.listen(5000, () => {
  console.log("server on port 5000");
});
