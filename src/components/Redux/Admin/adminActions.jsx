export const ADMIN_LOGIN = "ADMIN_LOGIN";
export const ADMIN_LOGOUT = "ADMIN_LOGOUT";

export const adminLogin = (admin) => ({
  type: ADMIN_LOGIN,
  payload: admin,
});
export const adminLogout = () => ({
  type: ADMIN_LOGOUT,
});