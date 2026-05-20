const API_URL = "http://localhost:5034/api/auth";

export const login = async (username, password) => {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
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