function ProductCard({ name, price, categoryName }) {
  return (
    <div className="card">
      <h3 style={{ marginTop: 0 }}>{name}</h3>
      <p>Precio: S/ {price}</p>
      <p>Categoría: {categoryName ?? "Sin categoría"}</p>
    </div>
  );
}

export default ProductCard;