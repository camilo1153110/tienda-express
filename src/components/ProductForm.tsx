import { useState } from 'react';
import type { Producto } from '../types/tienda';

interface ProductFormProps {
  productoInicial: Producto;
  onGuardar: (producto: Producto) => void;
}

function ProductForm({ productoInicial, onGuardar }: ProductFormProps) {
  const [producto, setProducto] = useState<Producto>(productoInicial);

  const hayCambios = JSON.stringify(producto) !== JSON.stringify(productoInicial);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProducto(prev => ({
      ...prev,
      [name]: name === 'precio' || name === 'stock' ? Number(value) : value,
    }));
  };

  const handleProveedorNombre = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProducto(prev => ({
      ...prev,
      proveedor: {
        ...prev.proveedor,
        nombre: e.target.value,
      },
    }));
  };

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

  const descartar = () => {
    setProducto(productoInicial);
  };

  return (
    <div className="card p-3">
      <h5 className="card-title mb-3">Editar Producto</h5>

      <div className="row g-2 mb-2">
        <div className="col-md-6">
          <label className="form-label small">Nombre</label>
          <input
            type="text"
            className="form-control"
            name="nombre"
            value={producto.nombre}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label small">Categoría</label>
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

        <div className="col-md-6">
          <label className="form-label small">Precio</label>
          <input
            type="number"
            className="form-control"
            name="precio"
            value={producto.precio}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label small">Stock</label>
          <input
            type="number"
            className="form-control"
            name="stock"
            value={producto.stock}
            onChange={handleChange}
          />
        </div>
      </div>

      <h6 className="mt-2 text-secondary small">Datos del Proveedor</h6>
      <div className="row g-2 mb-3">
        <div className="col-md-4">
          <label className="form-label small">Nombre Proveedor</label>
          <input
            type="text"
            className="form-control"
            value={producto.proveedor.nombre}
            onChange={handleProveedorNombre}
          />
        </div>

        <div className="col-md-4">
          <label className="form-label small">Teléfono</label>
          <input
            type="text"
            className="form-control"
            name="telefono"
            value={producto.proveedor.contacto.telefono}
            onChange={handleContacto}
          />
        </div>

        <div className="col-md-4">
          <label className="form-label small">Ciudad</label>
          <input
            type="text"
            className="form-control"
            name="ciudad"
            value={producto.proveedor.contacto.ciudad}
            onChange={handleContacto}
          />
        </div>
      </div>

      <div className="d-flex gap-2">
        <button
          className="btn btn-primary"
          onClick={() => onGuardar(producto)}
          disabled={!hayCambios}
        >
          Guardar
        </button>
        <button
          className="btn btn-outline-secondary"
          onClick={descartar}
          disabled={!hayCambios}
        >
          Descartar cambios
        </button>
      </div>

      <pre className="bg-light p-2 mt-3 rounded small" style={{ maxHeight: '180px', overflow: 'auto' }}>
        {JSON.stringify(producto, null, 2)}
      </pre>
    </div>
  );
}

export default ProductForm;
