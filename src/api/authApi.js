import { apiFetch } from "./apiClient";

export const login = async (username, password) => {
  const res = await apiFetch(`/auth/login`, {
    method: "POST",
    body: JSON.stringify({
      username,
      password
    })
  });

  if (!res.ok) {
    throw new Error("Usuario o contraseña incorrectos");
  }

  const token = await res.text();

  return token.replaceAll('"', '');
};