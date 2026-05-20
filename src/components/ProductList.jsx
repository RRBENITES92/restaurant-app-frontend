import ProductCard from "./ProductCard";
import { Pencil, Power } from "lucide-react";

function ProductList({ products, token, role, handleEditClick, handleDeleteProduct }) {

    if (products.length === 0) {
        return <div className="empty-state">No hay productos disponibles</div>;
    }

    return (
        <div className="product-list">
            {products.map(product => (
                <div key={product.id} className="product-item">

                    <div className="product-card-wrapper">
                        <ProductCard
                            name={product.name}
                            price={product.price}
                            categoryName={product.categoryName}
                        />

                        {role === "Admin" && (
                            <div className="product-actions">
                                <button
                                    className="button button-edit button-icon"
                                    onClick={() => handleEditClick(product)}
                                >
                                    <Pencil size={16} />
                                    Editar
                                </button>

                                <button
                                    className="button button-delete button-icon"
                                    onClick={() => handleDeleteProduct(product.id)}
                                >
                                    <Power size={16} />
                                    Desactivar
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ProductList;