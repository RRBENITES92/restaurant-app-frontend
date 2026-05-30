import { Plus } from "lucide-react";

function ProductForm({
  name,
  price,
  setName,
  setPrice,
  editingProductId,
  handleSaveProduct,
  isSaving
}) {

  const buttonText = editingProductId === null
    ? "Crear producto"
    : "Guardar cambios";

  return (
    <form onSubmit={handleSaveProduct} className="form">
      <input
        className="input form-input"
        type="text"
        placeholder="Nombre del producto"
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={isSaving}
      />

      <input
        className="input form-input"
        type="number"
        placeholder="Precio"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        disabled={isSaving}
      />

      <button type="submit" className="button button-primary button-icon">
        <Plus size={16} />
        {isSaving ? "Guardando..." : buttonText}
      </button>
    </form>
  );
}

export default ProductForm;