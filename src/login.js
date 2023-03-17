import { getData } from "./db.js";
export const login = async function (user) {
  let users = JSON.parse(await getData());
  let found = users.find((dbUser) => {
    return user.password === dbUser.password && user.email === dbUser.email;
  });
  console.log(found, "found, in login");
  return found;
};
