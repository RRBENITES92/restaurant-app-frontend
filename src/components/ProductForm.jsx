function ProductForm({
  name,
  price,
  setName,
  setPrice,
  editingProductId,
  handleSaveProduct
}) {
  return (
    <form onSubmit={handleSaveProduct} className="form">
      <input
        className="input"
        type="text"
        placeholder="Nombre del producto"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="input"
        type="number"
        placeholder="Precio"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <button type="submit" className="button button-primary">
        {editingProductId === null ? "Crear producto" : "Guardar cambios"}
      </button>
    </form>
  );
}

export default ProductForm;