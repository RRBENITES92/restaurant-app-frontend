import ProductForm from "../components/ProductForm";
import ProductList from "../components/ProductList";
import Pagination from "../components/Pagination";
import Toast from "../components/Toast";
import ConfirmModal from "../components/ConfirmModal";
import {
  getProducts,
  createProduct,
  updateProduct,
  deactivateProduct
} from "../api/productApi";
import { LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useEffect, useRef, useState } from "react";


function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);
  const [totalCount, setTotalCount] = useState(0);
  const [editingProductId, setEditingProductId] = useState(null);
  const { token, role, isAdmin, logout } = useAuth();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const formRef = useRef(null);
  const [productToDelete, setProductToDelete] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

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

    setIsSaving(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const productData = {
        name,
        price: Number(price)
      };

      if (editingProductId === null) {
        await createProduct(productData, token);
        setSuccessMessage("Producto creado correctamente");
      } else {
        await updateProduct(editingProductId, productData, token);
        setSuccessMessage("Producto actualizado correctamente");
      }

      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);

      await fetchProducts();

      setName("");
      setPrice("");
      setEditingProductId(null);
    } catch (error) {
      console.error(error);
      setErrorMessage("Ocurrió un error al guardar el producto");

      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    } finally {
      setIsSaving(false);
    }
  };

  const handleEditClick = (product) => {
    setEditingProductId(product.id);
    setName(product.name);
    setPrice(product.price);

    formRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  };

  const handleDeleteProduct = async (id) => {
    try {
      setSuccessMessage("");
      setErrorMessage("");

      await deactivateProduct(id, token);
      await fetchProducts();

      setSuccessMessage("Producto desactivado correctamente");

      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);

    } catch (error) {
      console.error(error);

      setErrorMessage("No se pudo desactivar el producto");

      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  };

  const openDeleteModal = (product) => {
    setProductToDelete(product);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setProductToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const confirmDeleteProduct = async () => {
    if (!productToDelete) return;

    await handleDeleteProduct(productToDelete.id);
    closeDeleteModal();
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <div className="dashboard">

      <Toast
        message={successMessage || errorMessage}
        type={successMessage ? "success" : "error"}
      />

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        title="Desactivar producto"
        message={`¿Estás seguro de desactivar "${productToDelete?.name}"?`}
        confirmText="Sí, desactivar"
        cancelText="Cancelar"
        onConfirm={confirmDeleteProduct}
        onCancel={closeDeleteModal}
      />

      <div className="dashboard-container">

        <div className="dashboard-header">
          <div>
            <h1 className="title">Productos</h1>
            <p className="subtitle">Gestiona los productos del restaurante</p>
          </div>

          <div className="session-box">
            <span className="role-badge">{role}</span>

            <button className="button button-delete button-icon" onClick={logout}>
              <LogOut size={16} />
              Cerrar sesión
            </button>
          </div>
        </div>

        {isAdmin && (
          <div ref={formRef} className="form-card">
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
              isSaving={isSaving}
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
            handleDeleteProduct={openDeleteModal}
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