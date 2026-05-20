import ProductCard from "./ProductCard";

function ProductList({ products, token, role, handleEditClick, handleDeleteProduct }) {

    if (products.length === 0) {
        return <div className="empty-state">No hay productos disponibles</div>;
    }

    return (
        <div className="product-list">
            {products.map(product => (
                <div key={product.id}>
                    <ProductCard
                        name={product.name}
                        price={product.price}
                        categoryName={product.categoryName}
                    />

                    {role === "Admin" && (
                        <div className="product-actions">
                            <button
                                className="button button-edit"
                                onClick={() => handleEditClick(product)}
                            >
                                Editar
                            </button>

                            <button
                                className="button button-delete"
                                onClick={() => handleDeleteProduct(product.id)}
                            >
                                Desactivar
                            </button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default ProductList;