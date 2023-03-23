export const addUser = async function (req, res) {
  await saveData(req.body);
  res.redirect(req.headers.referer.slice(0, req.headers.referer.indexOf("&")) + `&msg=Administratorius pridėtas ${req.body.name}`); //back..
};
