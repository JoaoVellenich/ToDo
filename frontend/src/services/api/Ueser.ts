import { IUser } from "../../types/User";
import { api } from "./Config";

export async function registerUser(user: IUser) {
  const response = await api.post("/user/create", user);
  return response;
}
