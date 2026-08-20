import { useState } from 'react';

function VentasCounter() {
  const [ventas, setVentas] = useState(0);
  const [cajaAbierta, setCajaAbierta] = useState(true);

  const registrarVenta = () => {
    setVentas(v => v + 1);
  };

  const registrarCombo = () => {
    setVentas(v => v + 1);
    setVentas(v => v + 1);
    setVentas(v => v + 1);
  };

  const anularUltima = () => {
    setVentas(v => Math.max(0, v - 1));
  };

  const cerrarCaja = () => {
    setVentas(0);
    setCajaAbierta(false);
  };

  const reabrirCaja = () => {
    setVentas(0);
    setCajaAbierta(true);
  };

  return (
    <div className="card-body">
      <h5 className="card-title">Contador de Ventas</h5>
      <p className="fs-4">Ventas hoy: <strong>{ventas}</strong></p>
      <span className={`badge ${cajaAbierta ? 'bg-success' : 'bg-secondary'} mb-3`}>
        {cajaAbierta ? 'Caja abierta' : 'Caja cerrada'}
      </span>
      <div className="d-flex gap-2 flex-wrap">
        <button className="btn btn-primary" onClick={registrarVenta} disabled={!cajaAbierta}>
          +1 venta
        </button>
        <button className="btn btn-info" onClick={registrarCombo} disabled={!cajaAbierta}>
          Combo (+3)
        </button>
        <button className="btn btn-warning" onClick={anularUltima} disabled={!cajaAbierta}>
          Anular última
        </button>
        <button className="btn btn-danger" onClick={cerrarCaja} disabled={!cajaAbierta}>
          Cerrar caja
        </button>
        {!cajaAbierta && (
          <button className="btn btn-success" onClick={reabrirCaja}>
            Reabrir caja
          </button>
        )}
      </div>
    </div>
  );
}

export default VentasCounter;
