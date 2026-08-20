import { useState } from 'react';
import type { Producto } from '../types/tienda';

interface ProductFormProps {
  productoInicial: Producto;
  onGuardar: (producto: Producto) => void;
}

function ProductForm({ productoInicial, onGuardar }: ProductFormProps) {
  const [producto, setProducto] = useState<Producto>(productoInicial);

  // R8: valor derivado, NUNCA useState
  const hayCambios = JSON.stringify(producto) !== JSON.stringify(productoInicial);

  // R4: manejador genérico para campos de primer nivel
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProducto(prev => ({
      ...prev,
      [name]: name === 'precio' || name === 'stock' ? Number(value) : value,
    }));
  };

  // R3: manejador para proveedor.nombre (2 niveles)
  const handleProveedorNombre = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProducto(prev => ({
      ...prev,
      proveedor: {
        ...prev.proveedor,
        nombre: e.target.value,
      },
    }));
  };

  // R3: manejador para proveedor.contacto.telefono / ciudad (3 niveles)
  const handleContacto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProducto(prev => ({
      ...prev,
      proveedor: {
        ...prev.proveedor,
        contacto: {
          ...prev.proveedor.contacto,
          [name]: value,
        },
      },
    }));
  };

  // R6: descartar cambios
  const descartar = () => {
    setProducto(productoInicial);
  };

  return (
    <div className="card p-3">
      <h5 className="card-title">Editar Producto</h5>

      <div className="mb-2">
        <label className="form-label">Nombre</label>
        <input
          type="text"
          className="form-control"
          name="nombre"
          value={producto.nombre}
          onChange={handleChange}
        />
      </div>

      <div className="mb-2">
        <label className="form-label">Categoría</label>
        <select
          className="form-select"
          name="categoria"
          value={producto.categoria}
          onChange={handleChange}
        >
          <option value="abarrotes">Abarrotes</option>
          <option value="aseo">Aseo</option>
          <option value="bebidas">Bebidas</option>
        </select>
      </div>

      <div className="mb-2">
        <label className="form-label">Precio</label>
        <input
          type="number"
          className="form-control"
          name="precio"
          value={producto.precio}
          onChange={handleChange}
        />
      </div>

      <div className="mb-2">
        <label className="form-label">Stock</label>
        <input
          type="number"
          className="form-control"
          name="stock"
          value={producto.stock}
          onChange={handleChange}
        />
      </div>

      <hr />
      <h6>Proveedor</h6>

      <div className="mb-2">
        <label className="form-label">Nombre del proveedor</label>
        <input
          type="text"
          className="form-control"
          value={producto.proveedor.nombre}
          onChange={handleProveedorNombre}
        />
      </div>

      <div className="mb-2">
        <label className="form-label">Teléfono</label>
        <input
          type="text"
          className="form-control"
          name="telefono"
          value={producto.proveedor.contacto.telefono}
          onChange={handleContacto}
        />
      </div>

      <div className="mb-2">
        <label className="form-label">Ciudad</label>
        <input
          type="text"
          className="form-control"
          name="ciudad"
          value={producto.proveedor.contacto.ciudad}
          onChange={handleContacto}
        />
      </div>

      <div className="d-flex gap-2 mt-2">
        <button
          className="btn btn-success"
          onClick={() => onGuardar(producto)}
          disabled={!hayCambios}
        >
          Guardar
        </button>
        <button className="btn btn-outline-secondary" disabled={!hayCambios} onClick={descartar}>
          Descartar cambios
        </button>
      </div>

      {/* R7: panel de vista previa */}
      <pre className="bg-light p-2 mt-3 rounded" style={{ textAlign: 'left' }}>
        {JSON.stringify(producto, null, 2)}
      </pre>
    </div>
  );
}

export default ProductForm;
