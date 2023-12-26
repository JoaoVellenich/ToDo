export default function checkAuth() {
  const token = sessionStorage.getItem("Token");
  console.log(token);
  return token !== "" && token !== null;
}
