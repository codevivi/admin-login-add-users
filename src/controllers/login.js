import { getData } from "../db.js";
export const login = async function (req, res) {
  let dbUsers = await getData();
  let found = dbUsers.find((dbUser) => {
    return req.body.password === dbUser.password && req.body.email === dbUser.email;
  });
  if (found) {
    req.session.isLoggedIn = true;
    req.session.userName = found.name;
    req.session.user = { name: found.name, surname: found.surname, email: found.email };
    console.log(req.session, "login ok");
    res.redirect("/administratorius");
  } else {
    console.log("did not logged in");
    console.log(req.body);
    req.session.errMsg = "Netinkami prisijungimo duomenys.";
    res.redirect("/");
  }
};
