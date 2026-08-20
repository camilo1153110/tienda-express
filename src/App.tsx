import { useState } from 'react';
import Card from './components/Card';
import VentasCounter from './components/VentasCounter';
import ProductForm from './components/ProductForm';
import type { Producto } from './types/tienda';

const PRODUCTO_INICIAL: Producto = {
  id: 1,
  nombre: 'Arroz Diana 500g',
  categoria: 'abarrotes',
  precio: 2800,
  stock: 40,
  proveedor: {
    nombre: 'Distrisur',
    contacto: {
      telefono: '3115550001',
      ciudad: 'Pitalito',
    },
  },
};

function App() {
  const [productoActual, setProductoActual] = useState<Producto>(PRODUCTO_INICIAL);

  const handleGuardar = (productoGuardado: Producto) => {
    setProductoActual(productoGuardado);
  };

  return (
    <div className="container-fluid p-4">
      <nav className="navbar navbar-dark bg-dark px-3 mb-4 rounded">
        <span className="navbar-brand mb-0 h1">TiendaExpress — Terminal de Punto de Venta</span>
      </nav>

      <div className="row g-4">
        <div className="col-md-5">
          <Card>
            <VentasCounter />
          </Card>
        </div>

        <div className="col-md-7">
          <ProductForm
            productoInicial={productoActual}
            onGuardar={handleGuardar}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
