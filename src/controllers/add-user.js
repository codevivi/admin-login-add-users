import { getData, saveData } from "../db.js";
export const addUser = async function (req, res) {
  let users = await getData();
  let exists = users.find((user) => user.email === req.body.email);
  if (exists) {
    req.session.errMsg = "Vartotojas su tokiu elektroninio pašto adresu jau egzistuoja.";
    return res.redirect("/add-user");
  }
  await saveData(req.body);
  res.redirect("/administratorius");
};
