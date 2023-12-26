export default function checkAuth() {
  const token = sessionStorage.getItem("Token");
  return token !== "" && token !== null;
}
