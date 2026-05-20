const API_URL = "http://localhost:5034/api/products";

export const getProducts = async (page, pageSize) => {
  const res = await fetch(`${API_URL}?page=${page}&pageSize=${pageSize}`);
  return await res.json();
};

export const createProduct = async (productData) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(productData)
  });

  return await res.json();
};

export const updateProduct = async (id, productData) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(productData)
  });

  return await res.json();
};

export const deactivateProduct = async (id, token) => {
  const res = await fetch(`${API_URL}/${id}/deactivate`, {
    method: "PUT",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });

  return res;
};