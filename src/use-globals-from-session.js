export const useGlobalsFromSession = function (session) {
  let errMsg = session.errMsg;
  delete session.errMsg;
  let okMsg = session.msg;
  delete session.msg;
  let userName = "";
  if (session.user) {
    userName = session.user.name;
  }
  return { errMsg, okMsg, isLoggedIn: session.isLoggedIn, userName };
};
