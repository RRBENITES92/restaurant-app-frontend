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
import { LogOut } from "lucide-react";

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
    <div className="dashboard">
      <div className="dashboard-container">

        <div className="dashboard-header">
          <div>
            <h1 className="title">Productos</h1>
            <p className="subtitle">Gestiona los productos del restaurante</p>
          </div>

          <div className="session-box">
            <span className="role-badge">{role}</span>

            <button className="button button-delete button-icon" onClick={handleLogout}>
              <LogOut size={16} />
              Cerrar sesión
            </button>
          </div>
        </div>

        {role === "Admin" && (
          <div className="form-card">
            <h2 className="section-title">
              {editingProductId === null ? "Crear producto" : "Editar producto"}
            </h2>

            <ProductForm
              name={name}
              price={price}
              setName={setName}
              setPrice={setPrice}
              editingProductId={editingProductId}
              handleSaveProduct={handleSaveProduct}
            />
          </div>
        )}

        <div className="products-section">
          <div className="section-header">
            <h2 className="section-title">Lista de productos</h2>
            <span className="products-count">{totalCount} productos</span>
          </div>

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

      </div>
    </div>
  );
}

export default ProductsPage;