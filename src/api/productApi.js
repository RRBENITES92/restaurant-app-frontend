import { apiFetch } from "./apiClient";

const API_URL = "/products";

export const getProducts = async (page, pageSize) => {
  const res = await apiFetch(`${API_URL}?page=${page}&pageSize=${pageSize}`);
  return await res.json();
};

export const createProduct = async (productData) => {
  const res = await apiFetch(API_URL, {
    method: "POST",
    body: JSON.stringify(productData)
  });

  return await res.json();
};

export const updateProduct = async (id, productData) => {
  const res = await apiFetch(`${API_URL}/${id}`, {
    method: "PUT",
    body: JSON.stringify(productData)
  });

  return await res.json();
};

export const deactivateProduct = async (id) => {
  const res = await apiFetch(`${API_URL}/${id}/deactivate`, {
    method: "PUT"
  });

  return res;
};