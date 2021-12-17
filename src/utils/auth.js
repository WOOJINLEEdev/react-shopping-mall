export function isLogin() {
  const token = localStorage.getItem("token");

  return Boolean(token);
}
