import { getData, resaveData } from "../db.js";
export const editUser = async function (req, res) {
  const data = await getData();
  let name = req.body.name;
  let surname = req.body.surname;
  let current_email = req.body.current_email;
  let email = req.body.email;
  let password = req.body.password;
  let user = { name, surname, email, password };
  if (email !== current_email) {
    //reiskia email nekaiciamas ir jei ziuretume ar toks egzistuoja, jis egzistuotu
    let alreadyExists = data.find((user) => user.email === email);
    if (alreadyExists) {
      req.session.errMsg = "Vartotojas su tokiu elektroninio pa6to adresu, jau egzistuoja.";
      req.session.formPrefills = { name, surname, email: current_email, password };
      return res.redirect(`/edit-user/${req.body.id}`); //forma resetinasi..nelabai gerai.. nezinau kaip uzpilyd per redirekta..
    }
  }
  data[req.body.id] = user;
  await resaveData(data);
  if (req.body.current_email === req.session.user.email) {
    req.session.user = { name, surname, email };
  }
  res.redirect("/administratorius");
};
