import { getData } from "./db.js";
export const login = async function (user) {
  let dbUsers = JSON.parse(await getData());
  let found = dbUsers.find((dbUser) => {
    return user.password === dbUser.password && user.email === dbUser.email;
  });
  return found ? found.name : false;
};
