import { getData, deleteUserById } from "../db.js";
export const deleteUser = async function (req, res) {
  let users = await getData();
  if (req.session.user.email === users[req.params.id].email) {
    req.session.message = "Deja negalite ištrinti saves, kreipkitės i admiministratorių (save?)";
  }
  deleteUserById(req.params.id);
  return res.redirect("/administratorius");
};
