import type { Producto } from '../types/tienda';
import ProductForm from './ProductForm';

interface ProductDetailProps {
  producto: Producto;
  onGuardar: (producto: Producto) => void;
  onAgregarAlCarrito: (producto: Producto) => void;
}

function ProductDetail({ producto, onGuardar, onAgregarAlCarrito }: ProductDetailProps) {
  return (
    <div>
      <ProductForm productoInicial={producto} onGuardar={onGuardar} />
      <button
        className="btn btn-primary mt-2 w-100"
        onClick={() => onAgregarAlCarrito(producto)}
      >
        Agregar a la venta
      </button>
    </div>
  );
}

export default ProductDetail;
