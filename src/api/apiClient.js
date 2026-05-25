const BASE_URL = import.meta.env.VITE_API_URL;

export const apiFetch = async (endpoint, options = {}) => {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers
  });

  if (response.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }

  if (!response.ok) {
    const text = await response.text();

    let message = "Error en la petición";

    try {
      const json = JSON.parse(text);
      message = json.message || message;
    } catch {
      message = text;
    }

    throw new Error(message);
  }

  return response;
};