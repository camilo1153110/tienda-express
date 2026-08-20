import { useState } from 'react';
import type { Producto, ItemCarrito } from '../types/tienda';

type EstadoEnvio = 'listo' | 'enviando' | 'enviado';

interface CartProps {
  items: ItemCarrito[];
  productos: Producto[];
  onAgregar: (producto: Producto) => void;
  onIncrementar: (productoId: number) => void;
  onDecrementar: (productoId: number) => void;
  onQuitar: (productoId: number) => void;
  onVaciar: () => void;
}

function Cart({
  items,
  productos,
  onAgregar,
  onIncrementar,
  onDecrementar,
  onQuitar,
  onVaciar,
}: CartProps) {
  const [estadoEnvio, setEstadoEnvio] = useState<EstadoEnvio>('listo');

  // R7: total derivado con reduce, NUNCA useState
  const total = items.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
  // R8: contadores derivados
  const articulosDistintos = items.length;
  const unidadesTotales = items.reduce((sum, item) => sum + item.cantidad, 0);

  const enviando = estadoEnvio === 'enviando';

  // R9: simular envío
  const enviar = () => {
    setEstadoEnvio('enviando');
    setTimeout(() => {
      setEstadoEnvio('enviado');
    }, 2000);
  };

  const reiniciar = () => {
    onVaciar();
    setEstadoEnvio('listo');
  };

  return (
    <div className="card p-3">
      <h5 className="card-title">Carrito de Compras</h5>

      {/* Catálogo para agregar */}
      <div className="mb-3">
        <h6>Agregar productos:</h6>
        <div className="d-flex gap-2 flex-wrap">
          {productos.map(prod => (
            <button
              key={prod.id}
              className="btn btn-outline-primary btn-sm"
              onClick={() => onAgregar(prod)}
              disabled={enviando}
            >
              + {prod.nombre}
            </button>
          ))}
        </div>
      </div>

      {/* R8: resumen */}
      <p>
        <strong>Artículos distintos:</strong> {articulosDistintos} |{' '}
        <strong>Unidades totales:</strong> {unidadesTotales}
      </p>

      {/* Lista del carrito */}
      {items.length === 0 ? (
        <p className="text-muted">El carrito está vacío</p>
      ) : (
        <ul className="list-group mb-3">
          {items.map(item => (
            <li key={item.productoId} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <strong>{item.nombre}</strong> — ${item.precio.toLocaleString('es-CO')} × {item.cantidad} = ${(item.precio * item.cantidad).toLocaleString('es-CO')}
              </div>
              <div className="d-flex gap-1">
                <button className="btn btn-sm btn-outline-success" onClick={() => onIncrementar(item.productoId)} disabled={enviando}>+</button>
                <button className="btn btn-sm btn-outline-warning" onClick={() => onDecrementar(item.productoId)} disabled={enviando}>−</button>
                <button className="btn btn-sm btn-outline-danger" onClick={() => onQuitar(item.productoId)} disabled={enviando}>Quitar</button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* R7: total derivado con formato es-CO */}
      <p className="fs-5"><strong>Total:</strong> ${total.toLocaleString('es-CO')}</p>

      {/* R9: estado de envío */}
      <p>
        <span className={`badge ${
          estadoEnvio === 'listo' ? 'bg-primary' :
          estadoEnvio === 'enviando' ? 'bg-warning text-dark' :
          'bg-success'
        }`}>
          {estadoEnvio === 'listo' ? 'Listo para enviar' :
           estadoEnvio === 'enviando' ? 'Enviando...' :
           'Enviado ✓'}
        </span>
      </p>

      <div className="d-flex gap-2">
        <button className="btn btn-danger" onClick={onVaciar} disabled={enviando || items.length === 0}>
          Vaciar carrito
        </button>
        {estadoEnvio === 'listo' && items.length > 0 && (
          <button className="btn btn-success" onClick={enviar}>
            Enviar pedido
          </button>
        )}
        {estadoEnvio === 'enviado' && (
          <button className="btn btn-primary" onClick={reiniciar}>
            Nuevo pedido
          </button>
        )}
      </div>
    </div>
  );
}

export default Cart;
