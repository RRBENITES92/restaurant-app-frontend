import { useEffect, useState } from "react";
import {
  getProducts,
  createProduct,
  updateProduct,
  deactivateProduct
} from "../api/productApi";

import ProductForm from "../components/ProductForm";
import ProductList from "../components/ProductList";
import Pagination from "../components/Pagination";

function ProductsPage({ token, role, handleLogout }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);
  const [totalCount, setTotalCount] = useState(0);
  const [editingProductId, setEditingProductId] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const response = await getProducts(page, pageSize);

      setProducts(response.data.items);
      setTotalCount(response.data.totalCount);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const totalPages = Math.ceil(totalCount / pageSize);

  const handleSaveProduct = async (e) => {
    e.preventDefault();

    const productData = {
      name,
      price: Number(price)
    };

    if (editingProductId === null) {
      await createProduct(productData);
    } else {
      await updateProduct(editingProductId, productData);
    }

    await fetchProducts();

    setName("");
    setPrice("");
    setEditingProductId(null);
  };

  const handleEditClick = (product) => {
    setEditingProductId(product.id);
    setName(product.name);
    setPrice(product.price);
  };

  const handleDeleteProduct = async (id) => {
    const savedToken = localStorage.getItem("token");
    await deactivateProduct(id, savedToken);
    await fetchProducts();
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <div className="container">

      <div className="header">
        <h1 className="title">Productos</h1>

        <button className="button button-delete" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </div>

      {role === "Admin" && (
        <ProductForm
          name={name}
          price={price}
          setName={setName}
          setPrice={setPrice}
          editingProductId={editingProductId}
          handleSaveProduct={handleSaveProduct}
        />
      )}

      <ProductList
        products={products}
        role={role}
        handleEditClick={handleEditClick}
        handleDeleteProduct={handleDeleteProduct}
      />

      <Pagination
        page={page}
        totalPages={totalPages}
        setPage={setPage}
      />

    </div>
  );
}

export default ProductsPage;