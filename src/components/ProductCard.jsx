function ProductCard({ name, price, categoryName }) {
  return (
    <div className="product-card">
      <div>
        <h3 className="product-name">{name}</h3>
        <span className="product-category">
          {categoryName ?? "Sin categoría"}
        </span>
      </div>

      <div className="product-price">
        S/ {price}
      </div>
    </div>
  );
}

export default ProductCard;