import { IUser } from "../../types/User";
import { api } from "./Config";

export async function registerUser(user: IUser) {
  const response = await api.post("/user/create", user);
  return response;
}

export async function loginUser(email: string, password: string) {
  const response = await api.post("/user/login", { email, password });
  return response;
}
