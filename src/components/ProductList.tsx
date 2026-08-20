import type { Producto } from '../types/tienda';

interface ProductListProps {
  productos: Producto[];
  seleccionadoId: number | null;
  onSeleccionar: (id: number) => void;
}

function ProductList({ productos, seleccionadoId, onSeleccionar }: ProductListProps) {
  return (
    <ul className="list-group">
      {productos.map(prod => (
        <li
          key={prod.id}
          className={`list-group-item list-group-item-action${
            prod.id === seleccionadoId ? ' active' : ''
          }`}
          onClick={() => onSeleccionar(prod.id)}
          style={{ cursor: 'pointer' }}
        >
          <strong>{prod.nombre}</strong> — ${prod.precio} ({prod.categoria})
        </li>
      ))}
    </ul>
  );
}

export default ProductList;
