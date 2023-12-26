import { api } from "./Config";

export async function createTask(name: string) {
  const token = sessionStorage.getItem("Token");
  const response = await api.post(
    "/task/create",
    {
      name,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
}

export async function getTasks() {
  const token = sessionStorage.getItem("Token");
  const response = await api.get("/task/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
}

export async function checkTask(taskId: number) {
  const token = sessionStorage.getItem("Token");
  const response = await api.get(`/task/complete/${taskId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
}
