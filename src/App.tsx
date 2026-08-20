import { useState, useEffect } from 'react';
import type { Producto, ItemCarrito } from './types/tienda';
import { useProducts } from './hooks/useProducts';
import { useToggle } from './hooks/useToggle';
import Card from './components/Card';
import VentasCounter from './components/VentasCounter';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';

function App() {
  const [busqueda, setBusqueda] = useState('');
  const { productos: productosServidor, cargando, error } = useProducts(busqueda);

  const [productosEditables, setProductosEditables] = useState<Producto[]>([]);
  const [productosServidorPrevio, setProductosServidorPrevio] = useState(productosServidor);

  if (productosServidor !== productosServidorPrevio) {
    setProductosServidorPrevio(productosServidor);
    setProductosEditables(productosServidor);
  }

  const [seleccionadoId, setSeleccionadoId] = useState<number | null>(null);

  const seleccionado = seleccionadoId !== null
    ? productosEditables.find(p => p.id === seleccionadoId) ?? null
    : null;

  const [items, setItems] = useState<ItemCarrito[]>([]);
  const unidades = items.reduce((sum, item) => sum + item.cantidad, 0);

  useEffect(() => {
    document.title = unidades > 0 ? `(${unidades}) TiendaExpress` : 'TiendaExpress';
  }, [unidades]);

  const [mostrarCarrito, alternarCarrito] = useToggle(true);

  const guardarProducto = (productoEditado: Producto) => {
    setProductosEditables(prev =>
      prev.map(p => p.id === productoEditado.id ? { ...productoEditado } : p)
    );
  };

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
      return [...prev, {
        productoId: producto.id,
        nombre: producto.nombre,
        precio: producto.precio,
        cantidad: 1,
      }];
    });
  };

  const incrementarCantidad = (productoId: number) => {
    setItems(prev =>
      prev.map(item =>
        item.productoId === productoId
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      )
    );
  };

  const decrementarCantidad = (productoId: number) => {
    setItems(prev =>
      prev
        .map(item =>
          item.productoId === productoId
            ? { ...item, cantidad: item.cantidad - 1 }
            : item
        )
        .filter(item => item.cantidad > 0)
    );
  };

  const quitarDelCarrito = (productoId: number) => {
    setItems(prev => prev.filter(item => item.productoId !== productoId));
  };

  const vaciarCarrito = () => {
    setItems([]);
  };

  const reintentar = () => {
    setBusqueda('');
  };

  return (
    <div className="container-fluid p-4">
      <nav className="navbar navbar-dark bg-dark px-3 mb-4 rounded d-flex justify-content-between">
        <span className="navbar-brand mb-0 h1">TiendaExpress — Terminal de Punto de Venta</span>
        {unidades > 0 && (
          <span className="badge bg-warning text-dark fs-6">{unidades} unid. en carrito</span>
        )}
      </nav>

      <div className="row g-4 mb-4">
        <div className="col-lg-4">
          <Card>
            <VentasCounter />
          </Card>
        </div>

        <div className="col-lg-8">
          <div className="card p-3 h-100">
            <h5 className="card-title">Catálogo de Productos</h5>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Buscar por nombre (ej. arroz, cafe, panela)..."
                value={busqueda}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBusqueda(e.target.value)}
                disabled={cargando}
              />
            </div>

            {error && (
              <div className="alert alert-danger py-2 d-flex justify-content-between align-items-center">
                <span>{error}</span>
                <button className="btn btn-outline-danger btn-sm" onClick={reintentar}>
                  Reintentar
                </button>
              </div>
            )}

            {cargando && (
              <div className="py-2 text-secondary">
                <em>Cargando productos…</em>
              </div>
            )}

            {!cargando && !error && (
              <div className="row g-3">
                <div className="col-md-5">
                  <ProductList
                    productos={productosEditables}
                    seleccionadoId={seleccionadoId}
                    onSeleccionar={setSeleccionadoId}
                  />
                </div>
                <div className="col-md-7">
                  {seleccionado ? (
                    <ProductDetail
                      producto={seleccionado}
                      onGuardar={guardarProducto}
                      onAgregarAlCarrito={agregarAlCarrito}
                    />
                  ) : (
                    <div className="text-muted small p-3 border rounded text-center">
                      Selecciona un producto de la lista para ver o editar su detalle.
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mb-3">
        <button className="btn btn-outline-secondary" onClick={alternarCarrito}>
          {mostrarCarrito ? 'Ocultar carrito' : 'Mostrar carrito'}
        </button>
      </div>

      {mostrarCarrito && (
        <div className="row">
          <div className="col-lg-12">
            <Cart
              items={items}
              productos={productosEditables}
              onAgregar={agregarAlCarrito}
              onIncrementar={incrementarCantidad}
              onDecrementar={decrementarCantidad}
              onQuitar={quitarDelCarrito}
              onVaciar={vaciarCarrito}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
