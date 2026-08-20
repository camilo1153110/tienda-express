import { useState } from 'react';
import Card from './components/Card';
import VentasCounter from './components/VentasCounter';
import ProductForm from './components/ProductForm';
import Cart from './components/Cart';
import type { Producto, ItemCarrito } from './types/tienda';

const PRODUCTO_INICIAL: Producto = {
  id: 1,
  nombre: 'Arroz Diana 500g',
  categoria: 'abarrotes',
  precio: 2800,
  stock: 40,
  proveedor: {
    nombre: 'Distrisur',
    contacto: { telefono: '3115550001', ciudad: 'Pitalito' },
  },
};

const CATALOGO_DEMO: Producto[] = [
  { id: 1, nombre: 'Arroz Diana 500g', categoria: 'abarrotes', precio: 2800, stock: 40, proveedor: { nombre: 'Distrisur', contacto: { telefono: '3115550001', ciudad: 'Pitalito' } } },
  { id: 2, nombre: 'Panela redonda', categoria: 'abarrotes', precio: 3500, stock: 25, proveedor: { nombre: 'Trapiche La Esperanza', contacto: { telefono: '3115550002', ciudad: 'Timaná' } } },
  { id: 3, nombre: 'Jabón Rey 300g', categoria: 'aseo', precio: 2200, stock: 60, proveedor: { nombre: 'Distrisur', contacto: { telefono: '3115550001', ciudad: 'Pitalito' } } },
];

function App() {
  const [productoActual, setProductoActual] = useState<Producto>(PRODUCTO_INICIAL);
  const [items, setItems] = useState<ItemCarrito[]>([]);

  const unidades = items.reduce((sum, item) => sum + item.cantidad, 0);

  const handleGuardar = (p: Producto) => setProductoActual(p);

  const agregarAlCarrito = (producto: Producto) => {
    setItems(prev => {
      const existe = prev.find(item => item.productoId === producto.id);
      if (existe) {
        return prev.map(item =>
          item.productoId === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }
      return [...prev, { productoId: producto.id, nombre: producto.nombre, precio: producto.precio, cantidad: 1 }];
    });
  };

  const incrementarCantidad = (productoId: number) => {
    setItems(prev => prev.map(item =>
      item.productoId === productoId ? { ...item, cantidad: item.cantidad + 1 } : item
    ));
  };

  const decrementarCantidad = (productoId: number) => {
    setItems(prev =>
      prev.map(item =>
        item.productoId === productoId ? { ...item, cantidad: item.cantidad - 1 } : item
      ).filter(item => item.cantidad > 0)
    );
  };

  const quitarDelCarrito = (productoId: number) => {
    setItems(prev => prev.filter(item => item.productoId !== productoId));
  };

  const vaciarCarrito = () => setItems([]);

  return (
    <div className="container-fluid p-4">
      <nav className="navbar navbar-dark bg-dark px-3 mb-4 rounded">
        <span className="navbar-brand mb-0 h1">TiendaExpress — Terminal de Punto de Venta</span>
        {unidades > 0 && (
          <span className="badge bg-warning text-dark fs-6">{unidades} unid. en carrito</span>
        )}
      </nav>

      <div className="row g-4">
        <div className="col-md-4">
          <Card>
            <VentasCounter />
          </Card>
        </div>

        <div className="col-md-4">
          <ProductForm productoInicial={productoActual} onGuardar={handleGuardar} />
        </div>

        <div className="col-md-4">
          <Cart
            items={items}
            productos={CATALOGO_DEMO}
            onAgregar={agregarAlCarrito}
            onIncrementar={incrementarCantidad}
            onDecrementar={decrementarCantidad}
            onQuitar={quitarDelCarrito}
            onVaciar={vaciarCarrito}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
